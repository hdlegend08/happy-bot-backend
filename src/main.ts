import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {RedisIoAdapter} from "./modules/chat/redis-io.adapter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      exposedHeaders: ['Content-Disposition'],
    },
  });

  app.useWebSocketAdapter(new RedisIoAdapter(app))

  await app.listen(3000);
}
bootstrap();
