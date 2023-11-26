import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GptRequestDto } from './dto/request-roadmap.dto';

@Injectable()
export class ChatgptService {
  public async getRoadmap(body: GptRequestDto): Promise<void> {
    const chatGPTBaseUrl = 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions';
    const apiKey = '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';

    try {
      const response = await axios.post(
        chatGPTBaseUrl,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: `${body}` },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling ChatGPT API:', error.message);
      throw error;
    }
  }
}
