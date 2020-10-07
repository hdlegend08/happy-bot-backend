import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { SocketJwtAuthGuard } from '../auth/socket-jwt-auth.guard';

@UseGuards(SocketJwtAuthGuard)
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer()
  server: Server;

  @UsePipes(new ValidationPipe())
  @UseInterceptors()
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'message'
  }

  async handleConnection(client) {
    console.log('connect');
  }

  handleDisconnect(client) {
    console.log('dis')
  }
}
