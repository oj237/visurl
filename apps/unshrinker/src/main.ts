import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const port = process.env.PORT || 8081;

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port
    }
  });
  
  await app.listen();
  console.log(`Unshrinker Service listening on port ${port}`)
}

bootstrap();
