import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ICooldownResponse } from '../../models/responses/authorization.responses';
import {
  ApiLogin,
  ApiSendCode,
  ApiSignUp,
  ApiVerifyCode,
} from '../../swagger/authorization/auth-response';
import { AuthorizationService } from './authorization.service';
import { AuthorizationCodeDto } from './dto/authorization-code.dto';
import { AuthorizationPhoneDto } from './dto/authorization-email.dto';
import { AuthorizationGuard } from './guards/authorization.guard';
import { SessionInfo } from 'src/utils/session-info.decorator';
import { GetSessionInfoDto } from './dto/authorization-get-session.dto';
import { CookieService } from './ cookie.service';
import { FastifyReply } from 'fastify';

@ApiTags('Authorization')
@Controller('auth')
export class AuthorizationController {
  constructor(
    private authorizationService: AuthorizationService,
    private cookieService: CookieService,
  ) {}

  @ApiSignUp()
  @Post('/sign-up')
  async signUp(
    @Body() body: AuthorizationPhoneDto,
  ): Promise<ICooldownResponse> {
    const response = await this.authorizationService.signUp(body);
    return response;
  }

  @ApiLogin()
  @Post('/login')
  async login(@Body() body: AuthorizationPhoneDto): Promise<ICooldownResponse> {
    const response = await this.authorizationService.login(body);
    return response;
  }

  @ApiSendCode()
  @Post('/send-code')
  async sendCode(@Body() body: AuthorizationPhoneDto): Promise<void> {
    await this.authorizationService.sendCode(body);
  }

  @ApiVerifyCode()
  @Post('/verify-code')
  async verifyCode(
    @Body() body: AuthorizationCodeDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const { accessToken } = await this.authorizationService.verifyCode(body);
    this.cookieService.setToken(res, accessToken);
  }

  @Post('/sign-out')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthorizationGuard)
  signOut(@Res({ passthrough: true }) res: FastifyReply) {
    this.cookieService.removeToken(res);
  }

  @Get('/session')
  @ApiOkResponse({
    type: GetSessionInfoDto,
  })
  @UseGuards(AuthorizationGuard)
  getSesssionInfo(@SessionInfo() session: GetSessionInfoDto) {
    return session;
  }
}
