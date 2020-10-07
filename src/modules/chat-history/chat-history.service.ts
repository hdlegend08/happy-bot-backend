import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatHistory } from './chat-history.interface';
import { ConfigService } from '@nestjs/config';
import {ChatGateway} from "../chat/chat.gateway";

@Injectable()
export class ChatHistoryService {
  constructor(
    @InjectModel('ChatHistory') private chatHistoryModel: Model<ChatHistory>,
    private configService: ConfigService,
    private chatGateway: ChatGateway,
  ) {}

  async listChat() {
    try {
      const botId = this.configService.get('BOT_ID');

      const result = await this.chatHistoryModel
        .find({ bot_id: botId })
        .sort({ end_at: 'desc' })
        .skip(0)
        .limit(30);

      return result
    } catch (e) {
      console.log(e);
    }

    return []
  }

  async receiveMessage(message) {
    try {
      this.chatGateway.server.emit('message', message)
      return true
    } catch (e) {
      console.log(e)
    }

    return false
  }
}
