import { Injectable } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Injectable()
export class CookieService {
  static tokenKey = 'access-token';

  setToken(res: FastifyReply, token: string) {
    res.setCookie(CookieService.tokenKey, token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });
  }

  removeToken(res: FastifyReply) {
    res.setCookie(CookieService.tokenKey, '', {
      httpOnly: true,
      maxAge: 0,
    });
  }
}
