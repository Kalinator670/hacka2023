import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ICooldownResponse } from '../../models/responses/authorization.responses';
import { ITokensResponse } from '../../models/responses/shared.responses';
import { ApiLogin, ApiRefresh, ApiSendCode, ApiSignUp, ApiVerifyCode } from '../../swagger/authorization/auth-response';
import { AuthorizationService } from './authorization.service';
import { AuthorizationCodeDto } from './dto/authorization-code.dto';
import { AuthorizationPhoneDto } from './dto/authorization-email.dto';
import { AuthorizationRefreshDto } from './dto/authorization-refresh.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthorizationController {

  private readonly authorizationService: AuthorizationService;

  constructor(authorizationService: AuthorizationService) {
    this.authorizationService = authorizationService;
  }

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
  ): Promise<void> {
    const tokens = await this.authorizationService.verifyCode(body);
    return tokens;
  }

  @ApiRefresh()
  @Post('/refresh')
  async refresh(
    @Body() body: AuthorizationRefreshDto,
  ): Promise<ITokensResponse> {
    const tokens = await this.authorizationService.refresh(body);
    return tokens;
  }
}
