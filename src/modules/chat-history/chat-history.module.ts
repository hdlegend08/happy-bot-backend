import {forwardRef, Module} from '@nestjs/common';
import { ChatHistoryService } from './chat-history.service';
import { ChatHistoryController } from './chat-history.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "../auth/auth.module";
import {ChatHistorySchema} from "./chat-history.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ChatHistory', schema: ChatHistorySchema, collection: 'call_history' }]),
    forwardRef(() => AuthModule),
  ],
  providers: [ChatHistoryService],
  controllers: [ChatHistoryController]
})
export class ChatHistoryModule {}
