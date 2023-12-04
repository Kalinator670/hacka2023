import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { IAuthorizationCode } from '../../../models/request/authorization.requests';

export class AuthorizationCodeDto implements IAuthorizationCode {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  code!: string;
}
