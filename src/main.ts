import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { configApp } from './app-setup';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

export async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  configApp(app);

  const config = app.get(ConfigService);
  await app.listen(config.env.PORT);
}

bootstrap();
