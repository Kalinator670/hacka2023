import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IAuthorizationRefresh } from '../../../models/request/authorization.requests';

export class AuthorizationRefreshDto implements IAuthorizationRefresh {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    refreshToken!: string;

}
