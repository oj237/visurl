import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'shrink' })
  async shrink(payload: { url: string, domain: string, token: string}){
      return await this.appService.setUrl(payload.url, payload.domain, payload.token);
  }
  
}
