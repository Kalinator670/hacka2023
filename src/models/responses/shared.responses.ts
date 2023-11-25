import { User } from "@prisma/client";

export interface ITokensResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
export interface ITokensResponseRefr {
  accessToken: string;
  refreshToken: string;
}