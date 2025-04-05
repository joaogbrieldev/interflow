import { IUserRepository } from '@core/user/domain/contracts/repository/user.repository';
import {
  IGetUserInput,
  IGetUserOutput,
  IGetUserUseCase,
} from '@core/user/domain/contracts/use-cases/get-user';
import { User } from '@core/user/domain/user.aggregate';
import { Injectable } from '@nestjs/common';
import { throwsException } from 'src/libs/shared/src/data-layer/helper/exception';
import { NotFoundError } from 'src/libs/shared/src/domain/errors/application/not-found.error';

@Injectable()
export class GetUserUseCase implements IGetUserUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(input: IGetUserInput): Promise<IGetUserOutput> {
    const { userId } = input;
    const user: User = await this._userRepository.get(userId);
    if (!user) throwsException(new NotFoundError('User not found'));
    return user;
  }
}
