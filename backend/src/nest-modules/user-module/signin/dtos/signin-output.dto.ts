import { User } from '@core/user/domain/user.aggregate';

export class SigninOutputDto {
  user: User;
  loggedAt: Date;
  token: string;
  refreshToken: string;

  constructor(token: string, refreshToken: string, user: User) {
    this.token = token;
    this.refreshToken = refreshToken;
    this.user = user;
    this.loggedAt = new Date();
  }
}
