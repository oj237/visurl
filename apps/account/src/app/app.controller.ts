import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'account_all' })
  async getAccounts() {
    return await this.appService.findAccounts();
  }

  @MessagePattern({ cmd: 'account_one' })
  async getAccount(id: string) {
    return await this.appService.findAccount(id);
  }

  @MessagePattern({ cmd: 'account_add'})
  async addAccount(user: any) {
    return await this.appService.addAccount(user);
  }

  @MessagePattern({ cmd: 'account_update' })
  async updateAccount(user: any) {
    return await this.appService.updateAccount(user);
  }
}
