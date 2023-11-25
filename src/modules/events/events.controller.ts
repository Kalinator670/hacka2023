import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthorizationGuard } from '../authorization/guards/authorization.guard';
import { Event, UserToEvent } from '@prisma/client';

@Controller('events')
export class EventsController {
  private readonly eventsService: EventsService;

  constructor(eventsService: EventsService) {
    this.eventsService = eventsService;
  }

  @ApiOkResponse({ type: 'Change inf user' })
  @UseGuards(AuthorizationGuard)
  @Post('/create-event')
  async createEvent(
    @Body() body: Event, 
  ): Promise<Event> {
    const response = await this.eventsService.createEvent(body);
    return response;
  }

  /*@ApiOkResponse({ type: 'Change inf user' })
  @UseGuards(AuthorizationGuard)
  @Post('/create-event')
  async addUserEvent(
    @Body() body: UserToEvent, 
  ): Promise<Event> {
    const response = await this.eventsService.addUserEvent(body);
    return response;
  }*/



}
