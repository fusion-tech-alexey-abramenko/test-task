import { ValidationPipe } from '@nestjs/common';
import * as config from 'config';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const APP_PORT: number = config.get('app.port');
const BODY_PARSER_LIMIT: string = config.get('body_parser_limit');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(bodyParser.json({ limit: BODY_PARSER_LIMIT }));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.setGlobalPrefix('/api');

  const options = new DocumentBuilder()
    .setTitle('Test task')
    .setDescription('Test task app')
    .setVersion('1.0')
    .addTag('Test task')
    .addBearerAuth()
    .setBasePath('/api')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);

  app.use(
    helmet({
      frameguard: false,
      noSniff: false,
      xssFilter: false,
    }),
  );

  await app.listen(APP_PORT);
}
bootstrap();
