/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { AuthorizationService } from '../authorization.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {

  private readonly authService: AuthorizationService;

  constructor(authService: AuthorizationService) {
    this.authService = authService;
  }

  public canActivate(context: ExecutionContext): boolean {
    try {
      const http = context.switchToHttp().getRequest();
      if (!http.headers?.authorization) {
        return false;
      }
      const token = http.headers.authorization.split(' ')?.[1];
      if (!token) {
        return false;
      }

      const { id } = this.authService.decodeToken(token);
      http.userId = id;

      return true;
    }
    catch (error) {
      return false;
    }
  }

}
