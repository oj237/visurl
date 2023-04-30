import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@vi-surl/shared';
import { Model, ProjectionElementType, ProjectionFields, ProjectionType } from 'mongoose';

@Injectable()
export class AppService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  async findAccounts() {
    const accounts = await this.userModel.find().exec();
    return accounts;
  }

  async findAccount(id: string) {
    const projection: ProjectionType<User> = {
      name: 1,
      email: 1,
      admin: 1,
      id: 1
    }

    const account = await this.userModel.findById(id, projection).exec();
    return account;
  }

  async addAccount(user: any) {
    return true;
  }

  async updateAccount(user: any) {
    return true;
  }
}
