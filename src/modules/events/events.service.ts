import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import { Requests } from 'src/utils/requests';
import { Event } from '@prisma/client';

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

}
