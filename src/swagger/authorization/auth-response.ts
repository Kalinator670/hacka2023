import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { TokensDto } from '../dto/tokens.response';
import { UnavailableService } from '../dto/unavailable-service.response';

export const ApiSignUp = (): MethodDecorator =>
  applyDecorators(
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Sign up successfully response',
    }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'Unique phone required',
      type: UnavailableService,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Bad request',
      type: UnavailableService,
    }),
  );

export const ApiLogin = (): MethodDecorator =>
  applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Login succesfully response',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User not found',
      type: UnavailableService,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Bad request',
      type: UnavailableService,
    }),
  );

export const ApiSendCode = (): MethodDecorator =>
  applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Code send succesfully response',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User not found',
      type: UnavailableService,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Bad request',
      type: UnavailableService,
    }),
  );

export const ApiVerifyCode = (): MethodDecorator =>
  applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Code verified succesfully response',
      type: () => TokensDto,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Bad request',
      type: UnavailableService,
    }),
  );

export const ApiRefresh = (): MethodDecorator =>
  applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Refresh succesfully response',
      type: () => TokensDto,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Bad request',
      type: UnavailableService,
    }),
  );
