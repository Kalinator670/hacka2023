// TODO: separate classes
/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
} from 'class-validator';

export class GptRequestDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  quiz1?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  quiz2?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  quiz3?: string;
}
