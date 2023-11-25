import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  IAuthorizationEmail,
  IAuthorizationRefresh,
  IAuthorizationCode,
} from '../../models/request/authorization.requests';
import { ICooldownResponse } from '../../models/responses/authorization.responses';
import { ITokensResponse } from '../../models/responses/shared.responses';
import { PrismaService } from '../../utils/prisma.service';
import { Requests } from '../../utils/requests';
import { config } from 'dotenv';
import { JwtPayload } from 'jsonwebtoken';
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthorizationService {
  private readonly prisma: PrismaService;
  private readonly requests: Requests;

  constructor(prisma: PrismaService, requests: Requests) {
    this.prisma = prisma;
    this.requests = requests;
  }

  public async signUp(body: IAuthorizationEmail): Promise<ICooldownResponse> {
    const checkExist = await this.prisma.user.count({
      where: { email: body.email },
    });
    if (checkExist) {
      throw new ConflictException('Unique email required');
    }

    const { email } = await this.prisma.user.create({
      data: { email: body.email,
        name: body.name,
        description: body.description,
      },
    });

    await this.prisma.userAuthWithCode.create({
      data: { email },
    });

    await this.sendCode(body);

    return { cooldown: 30 };
  }

  public async login(body: IAuthorizationEmail): Promise<ICooldownResponse> {
    const checkExist = await this.prisma.user.count({
      where: { email: body.email },
    });
    if (!checkExist) {
      throw new NotFoundException('Пхоне not found');
    }

    await this.sendCode(body);

    return { cooldown: 30 };
  }

  public async sendCode(body: IAuthorizationEmail): Promise<void> {
    const checkExist = await this.prisma.user.count({
      where: { email: body.email },
    });
    if (!checkExist) {
      throw new NotFoundException('Email not found sign up first blin');
    }

    const code = Math.round(Math.random() * 8999 + 1000).toString();
    await this.requests.sendEmailCode(code, body.email);
    await this.prisma.userAuthWithCode.update({
      where: { email: body.email },
      data: { code },
    });
  }

  public async verifyCode(body: IAuthorizationCode): Promise<void> {
    const checkExist = await this.prisma.userAuthWithCode.findFirst({
      where: { code: body.code },
    });
    if (!checkExist) {
      throw new NotFoundException('Неверные данные');
    }
    const user = await this.prisma.user.findFirst({
      where: { email: checkExist.email },
    });
    await this.prisma.userAuthWithCode.update({
      where: { email: checkExist.email },
      data: { code: null},
    });
    const { id } = await this.prisma.user.findUnique({ where: { email: checkExist.email } });
    const tokens = this.makeTokens({ id });
    return { ...tokens, user } as any;
  }

  public async refresh(body: IAuthorizationRefresh): Promise<ITokensResponse> {
    const tokenData: JwtPayload = this.decodeToken(body.refreshToken);
    const checkExist = await this.prisma.user.count({
      where: { id: tokenData.id },
    });
    if (!checkExist) {
      throw new NotFoundException('User was not found');
    }

    return this.makeTokens({ id: tokenData.id });
  }

  public makeTokens(data: object = {}): ITokensResponse {
    const accessToken: string = jwt.sign(data,
      process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m',
    });
    const refreshToken: string = jwt.sign(data,
      process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '180d',
    });
    return {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    };
  }

  public decodeToken(token: string): JwtPayload {
    const tokenData = jwt.decode(token) as JwtPayload;
    if (!tokenData) {
      throw new BadRequestException('Incorrect token');
    }
    if (tokenData.exp! <= Date.now() / 1000) {
      throw new BadRequestException('Token expired');
    }
    return tokenData as JwtPayload;
  }


}
