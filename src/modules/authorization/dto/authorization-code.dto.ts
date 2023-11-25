import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { IAuthorizationCode } from '../../../models/request/authorization.requests';

export class AuthorizationCodeDto implements IAuthorizationCode {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(10, 10)
  email?: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  code!: string;
}
