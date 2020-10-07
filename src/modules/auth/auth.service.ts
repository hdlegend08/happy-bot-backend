import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.attempt(username, pass);

    if (user) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, id: user._id };
    return {
      _id: user._id,
      token: this.jwtService.sign(payload, {
        expiresIn: parseInt(process.env.JWT_TTL),
      }),
      expires_in: parseInt(process.env.JWT_TTL)
    };
  }
}
