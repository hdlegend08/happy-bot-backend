import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';

@Controller('user')
export class UsersController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const user = await this.authService.login(req.user);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async getProfile(@Request() req) {
    const user = await this.userService.getProfile(req.user)

    return {
      user
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    try {
      if (
        req.hasOwnProperty('headers') &&
        req.headers.hasOwnProperty('authorization')
      ) {

      }
    } catch (e) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {
      mes: 'Logout success!',
    };
  }
}
