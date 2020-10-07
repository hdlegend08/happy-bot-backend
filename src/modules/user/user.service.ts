import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { InjectModel } from '@nestjs/mongoose';

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findById(userId: string): Promise<any> {
    const obj = await this.userModel.findById(userId).select('-password');

    return obj;
  }

  async comparePassword(plainPass: string, password: string): Promise<boolean> {
    return await bcrypt.compare(plainPass, password);
  }

  async attempt(username: string, password: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ username });
    if (user) {
      const matchPassword = await this.comparePassword(password, user.password);
      if (matchPassword) {
        return user.toObject();
      }
    }

    return null;
  }

  async getProfile(user: any): Promise<any> {
    try {
      const profile = await this.userModel
        .findById(user._id)
        .select('-password')
        .lean();

      return profile;
    } catch (e) {
      console.log(e);
    }

    return null;
  }
}
