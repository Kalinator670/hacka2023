import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import { Requests } from 'src/utils/requests';
import { Event, UserToEvent } from '@prisma/client';

@Injectable()
export class EventsService {
  private readonly prisma: PrismaService;
  private readonly requests: Requests;
  
  constructor(prisma: PrismaService, requests: Requests) {
    this.prisma = prisma;
    this.requests = requests;
  }


  public async createEvent(body: Event): Promise<Event> {
    const checkExist = await this.prisma.event.findFirst({
      where: { name: body.name },
    });
    if (checkExist) {
      throw new ConflictException('Event already exist');
    }
    const event = await this.prisma.event.create({
      data: body,
    });
    return event;
  }

  //доделать
  public async addUserEvent(body: UserToEvent): Promise<UserToEvent> {
    const checkExist = await this.prisma.userToEvent.findFirst({
      where: { user_id: body.user_id, event_id: body.event_id },
    });
    if (checkExist) {
      throw new ConflictException('User already in евент');
    }
    const userToEvent = await this.prisma.userToEvent.create({
      data: body,
    });
    return userToEvent;
  }

  public async getAllEvents(): Promise<void> {

    const allEvents = await this.prisma.event.findMany({
      include: {
        user: {
          include: { user: true },
        },
      },
    });

    return allEvents as any;
  }

}
