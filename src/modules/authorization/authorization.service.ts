import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  IAuthorizationEmail,
  IAuthorizationCode,
} from '../../models/request/authorization.requests';
import { ICooldownResponse } from '../../models/responses/authorization.responses';
import { ITokensResponseRefr } from '../../models/responses/shared.responses';
import { PrismaService } from '../../utils/prisma.service';
import { Requests } from '../../utils/requests';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthorizationService {
  private readonly prisma: PrismaService;
  private readonly requests: Requests;

  constructor(
    prisma: PrismaService,
    requests: Requests,
    private jwtService: JwtService,
  ) {
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
      data: {
        email: body.email,
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
      throw new NotFoundException('Email not found');
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

  public async verifyCode(
    body: IAuthorizationCode,
  ): Promise<ITokensResponseRefr> {
    const checkExist = await this.prisma.userAuthWithCode.findFirst({
      where: { code: body.code },
    });
    if (!checkExist) {
      throw new NotFoundException('Неверные данные');
    }
    await this.prisma.userAuthWithCode.update({
      where: { email: checkExist.email },
      data: { code: null },
    });
    const { id } = await this.prisma.user.findUnique({
      where: { email: checkExist.email },
    });
    const token = await this.makeToken({ id });
    return { ...token };
  }

  public async makeToken(data: { id: number }): Promise<ITokensResponseRefr> {
    const accessToken = await this.jwtService.signAsync({ id: data?.id });
    return { accessToken };
  }
}
