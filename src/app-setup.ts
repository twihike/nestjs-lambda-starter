// eslint-disable-next-line unicorn/import-style
import { join } from 'path';

import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';

import { ConfigService } from './config/config.service';

export function configApp(app: NestExpressApplication): NestExpressApplication {
  const config = app.get(ConfigService);

  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'public'));

  if (config.env.SWAGGER_UI) {
    const options = new DocumentBuilder().addBearerAuth().build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }

  return app;
}
