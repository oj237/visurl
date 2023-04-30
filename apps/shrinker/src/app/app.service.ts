import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Url } from '@vi-surl/shared';

import * as CRC from 'crc-32';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

interface IURL {
  url: string;
  visurl: string;
  visits: number;
  inits: number;
}

@Injectable()
export class AppService {

  private readonly redis: Redis;

  constructor(
    @InjectModel('Url') private readonly urlModel: Model<Url>,
    private readonly redisSvc: RedisService){
      this.redis = this.redisSvc.getClient();
    }

  async setUrl(url: string, domain: string, token: string): Promise<IURL> {
    const hash = CRC.str(`${url}?token=${token}`, 7).toString(32);

    let filter: FilterQuery<Url> = { 
      url,
      hash 
    };

    let update: UpdateQuery<Url> = {
      $set: {
        hash: hash
      },
      $inc: {
        inits: 1
      }
    }

    const result = await this.urlModel.findOneAndUpdate(filter, update, { 
      new: true, 
      upsert: true, 
      setDefaultsOnInsert: true,
      projection: {
        hash: 1,
        url: 1,
        visits: 1,
        inits: 1 
      }
     });

     const sentinel = await this.checkSentinel(result.hash);
     if(sentinel) await this.removeSentinel(result.hash);

     return {
      url: result.url,
      visurl: `${domain}/${result.hash}`,
      visits: result.visits,
      inits: result.inits
    }
  }

  private async checkSentinel(hash: string): Promise<string> {
    return await this.redis.get(hash);
  }

  private async removeSentinel(hash: string): Promise<void> {
    await this.redis.del(hash);
  }
}
