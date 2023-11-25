// TODO: separate classes
/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { UserProfileDto } from './user-profile.dto';
import { Transform } from 'class-transformer';

export class UserIdDto {

  @ApiProperty()
  @IsNumber()
    user_id!: number;


}
export class CreateUserDto {
  @ApiProperty()
  @IsNumber()
  @Transform((v) => (v?.value ? +v.value : 919919))
    id!: number;
}
