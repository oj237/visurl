import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UrlSchema } from '@vi-surl/shared';
import { RedisModule } from '@liaoliaots/nestjs-redis';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'visurl';

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || '6379';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Url', schema: UrlSchema }]),
    MongooseModule.forRoot(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`),
    RedisModule.forRoot({
      config: {
        host: REDIS_HOST,
        port: parseInt(REDIS_PORT)
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
