import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatgptService } from './chatgpt.service';
import { GptRequestDto } from './dto/request-roadmap.dto';

@ApiTags('Chatgpt')
@Controller('chatgpt')
export class ChatgptController {
  private readonly chatgptService: ChatgptService;

  constructor(chatgptService: ChatgptService) {
    this.chatgptService = chatgptService;
  }

  @Post('/')
  async getRoadmap(@Body() body: GptRequestDto): Promise<void> {
    const out = await this.chatgptService.getRoadmap(body);
    return out;
  }

}
