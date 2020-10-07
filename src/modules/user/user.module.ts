import { forwardRef, Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import {UsersController} from "./users.controller";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
