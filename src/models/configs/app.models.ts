export interface IAppConfig {
  name: string;
  port: number;
  isProduction: boolean;
  enableTestUser: boolean;
  secret: string;
}
