import { IUserRepository } from '@core/user/domain/contracts/repository/user.repository';
import { Injectable } from '@nestjs/common';

import {
  IAuthenticate,
  IAuthenticateInput,
  IAuthenticateOutput,
} from '@core/user/domain/contracts/use-cases/authenticate';
import { User } from '@core/user/domain/user.aggregate';
import {
  AuthenticationPayloadFactory,
  IAuthenticationPayload,
} from 'src/libs/shared/src/data-layer/factories/authentication-payload.factory';
import { throwsException } from 'src/libs/shared/src/data-layer/helper/exception';
import { IEncrypter } from 'src/libs/shared/src/domain/contracts/infrastructure/services/encrypter.service';
import { ITokenizationService } from 'src/libs/shared/src/domain/contracts/infrastructure/services/tokenization.service';
import { UnauthorizedError } from 'src/libs/shared/src/domain/errors/application';

@Injectable()
export class Authenticate implements IAuthenticate {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenizationService: ITokenizationService,
    private readonly encrypterService: IEncrypter,
  ) {}

  async execute(input: IAuthenticateInput): Promise<IAuthenticateOutput> {
    const { password, email } = input;
    const user: User = await this.userRepository.getUserByEmail(email);
    await this.validatePasswordSent(password, user.password);
    const payload: IAuthenticationPayload =
      AuthenticationPayloadFactory.MakeAuthenticationPayload(user);
    const { token, refreshToken } =
      await this.tokenizationService.generateTokens(payload);

    return this.makeResponse(token, refreshToken, user);
  }

  private makeResponse(
    token: string,
    refreshToken: string,
    user: User,
  ): IAuthenticateOutput {
    return {
      token,
      refreshToken,
      user: user,
    };
  }

  private async validatePasswordSent(
    password: string,
    hashedPassowrd: string,
  ): Promise<void> {
    const isCorrectPassword: boolean =
      await this.encrypterService.theValuesMatch(password, hashedPassowrd);
    if (!isCorrectPassword)
      throwsException(new UnauthorizedError('Username or password is wrong'));
  }
}
