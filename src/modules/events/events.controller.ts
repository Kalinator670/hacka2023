import { Controller, Post, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthorizationGuard } from '../authorization/guards/authorization.guard';

@Controller('events')
export class EventsController {
  private readonly eventsService: EventsService;

  constructor(eventsService: EventsService) {
    this.eventsService = eventsService;
  }

  /*@ApiOkResponse({ type: 'Change inf user' })
  @UseGuards(AuthorizationGuard)
  @Post('/create-event')
  async createEvent(
    @Body() body: ,
  ): Promise<ICooldownResponse> {
    const response = await this.;
    return response;
  }*/
  

}
