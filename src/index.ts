import { Server } from 'http';

import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { Context, Handler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import * as express from 'express';

import { configApp } from './app-setup';
import { AppModule } from './app.module';

let cachedServer: Server;

export async function handler(event: unknown, context: Context): Handler {
  if (!cachedServer) {
    cachedServer = await createServer(await bootstrap());
  }
  return proxy(cachedServer, event, context, 'PROMISE').promise;
}

async function bootstrap(): Promise<express.Express> {
  const expressApp = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  configApp(app);
  await app.init();

  return expressApp;
}
