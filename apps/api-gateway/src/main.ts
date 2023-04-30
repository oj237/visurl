import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 5000;
  await app.listen(port);
  Logger.log(`API Gateway is running on: http://localhost:${port}`);
}

bootstrap();
