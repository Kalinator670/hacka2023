import { Module } from '@nestjs/common';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [AuthorizationModule, ConfigModule.forRoot(), UserModule, EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
