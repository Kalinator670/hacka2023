import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import { Requests } from '../../utils/requests';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';

@Global()
@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService, PrismaService, Requests],
  imports: [],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
