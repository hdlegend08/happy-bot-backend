import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);

    const info = process.env.REDIS_CONNECTION.split(':');

    const redisAdapter = redisIoAdapter({ host: info[0], port: info[1] });

    server.adapter(redisAdapter);
    return server;
  }
}
