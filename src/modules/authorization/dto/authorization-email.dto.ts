import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { IAuthorizationEmail } from 'src/models/request/authorization.requests';

export class AuthorizationPhoneDto implements IAuthorizationEmail {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(10, 30)
  email!: string;
}
