// TODO: separate classes
/* eslint-disable max-classes-per-file */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  IsEmail,
  IsEmpty,
} from 'class-validator';

export class UserProfileDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
    id!: number;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
    email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
    name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
    surname?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
    age?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
    description?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  speciality?: string;

}

export class UserProfileWithIdDto extends UserProfileDto {

  @ApiProperty()
  @IsNumber()
    user_id!: number;

}
