export interface IAuthorizationCode {
  email: string;
  code: string;
}

export interface IAuthorizationEmail {
  email: string;
  name?: string;
  description?: string;
}

export interface IAuthorizationRefresh {
  refreshToken: string;
}
