import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Url } from '@vi-surl/shared';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class AppService {
  private readonly redis: Redis;

  constructor(
    @InjectModel('Url') private readonly urlModel: Model<Url>,
    private readonly redisSvc: RedisService
  ) {
    this.redis = this.redisSvc.getClient();
  }

  async getUrl(hash: string): Promise<string | null> {
    const sentinel = await this.checkSentinel(hash);
    if(sentinel) {
      await this.updateSentinel(hash);
      return null;
    };

    const result = await this.urlModel.findOne({ hash: hash }).exec();
    if(!result) {
      await this.createSentinel(hash);
      return null;
    };

    await this.updateVisit(hash);
    return result.url;
  }

  private async checkSentinel(hash: string): Promise<string> {
    return await this.redis.get(hash); 
  }

  private async createSentinel(hash: string): Promise<void> {
    await this.redis.set(hash, 1);
  }

  private async updateSentinel(hash: string): Promise<void> {
    await this.redis.incr(hash);
  }

  private async updateVisit(hash: string): Promise<void> {
    const filter: FilterQuery<Url> = {
      hash: hash
    };

    const update: UpdateQuery<Url> = {
      $inc: {
        visits: 1
      }
    };

    await this.urlModel.findOneAndUpdate(filter, update).exec();
  }
}
