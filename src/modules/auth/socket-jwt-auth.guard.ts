import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SocketJwtAuthGuard extends AuthGuard('socket-jwt') {
  getRequest(context) {
    return context.switchToWs().getClient().handshake;
  }
}
