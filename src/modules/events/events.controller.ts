import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthorizationGuard } from '../authorization/guards/authorization.guard';
import { Event, User, UserToEvent } from '@prisma/client';
import { CreateUserDto } from '../user/dto/user.dto';

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

  @ApiOkResponse({ type: 'Change inf user' })
  @UseGuards(AuthorizationGuard)
  @Post('/add-user-event')
  async addUserEvent(
    @Body() body: UserToEvent,
  ): Promise<UserToEvent> {
    const response = await this.eventsService.addUserEvent(body);
    return response;
  }

  @UseGuards(AuthorizationGuard)
  @ApiOkResponse({ type: 'All events blin with users'})
  @Get('/all-events')
  async getEvents(): Promise<void> {
    const allEvent = await this.eventsService.getAllEvents();
    return allEvent;
  }

  @ApiOkResponse({ type: 'Get one event' })
  @UseGuards(AuthorizationGuard)
  @Get('/:ok')
  async getOneEvent(@Param() params: CreateUserDto): Promise<Event> {
    const user = await this.eventsService.getEvent(params.id);
    return user;
  }

}
