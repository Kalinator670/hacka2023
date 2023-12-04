import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import { Requests } from '../../utils/requests';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { CookieService } from './ cookie.service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService, PrismaService, Requests, CookieService],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '20d' },
    }),
  ],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
