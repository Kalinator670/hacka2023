import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaService } from 'src/utils/prisma.service';
import { Requests } from 'src/utils/requests';

@Module({
  providers: [EventsService, PrismaService, Requests],
  controllers: [EventsController],
})
export class EventsModule {}
