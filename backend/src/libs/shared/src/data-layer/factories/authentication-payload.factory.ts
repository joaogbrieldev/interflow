import { User } from '@core/user/domain/user.aggregate';

export interface IAuthenticationPayload {
  userId: string;
  name: string;
  email: string;
}

export abstract class AuthenticationPayloadFactory {
  static MakeAuthenticationPayload(user: User): IAuthenticationPayload {
    return {
      userId: user?.id,
      name: user?.name,
      email: user?.email,
    };
  }
}
