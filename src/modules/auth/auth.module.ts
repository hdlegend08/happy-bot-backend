import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import {ConfigModule, ConfigService} from "@nestjs/config";
import { SocketJwtStrategy } from './socket-jwt.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: `${configService.get('JWT_TTL')}s` },
      }),
      inject: [ConfigService]
    }),
    forwardRef(() => UserModule),
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, SocketJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {

}
