import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ChatHistoryService } from './chat-history.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('chat-history')
export class ChatHistoryController {
  constructor(private chatHistoryService: ChatHistoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('list-chat')
  async getProfile(@Request() req) {
    const data = await this.chatHistoryService.listChat();

    return {
      data,
    };
  }

  @Post('receive-message')
  async receiveMessage(@Request() req) {
    const data = await this.chatHistoryService.receiveMessage(req.body.data)

    return data
  }
}
