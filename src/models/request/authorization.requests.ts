export interface IAuthorizationCode {
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
