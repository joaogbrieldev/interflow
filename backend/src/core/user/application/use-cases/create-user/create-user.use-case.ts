import { Injectable } from '@nestjs/common';
import { IEncrypter } from 'src/libs/shared/src/domain/contracts/infrastructure/services/encrypter.service';
import { IUserRepository } from '../../../domain/contracts/repository/user.repository';
import {
  ICreateUserInput,
  ICreateUserOutput,
  ICreateUserUseCase,
} from '../../../domain/contracts/use-cases/create-user';
import { User } from '../../../domain/user.aggregate';

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly _encrypter: IEncrypter,
  ) {}

  async execute({
    name,
    email,
    password,
  }: ICreateUserInput): Promise<ICreateUserOutput> {
    const hashedPassword: string = await this._encrypter.encrypt(password);

    const entity = User.create({ name, email });
    entity.defineHashedPassword(hashedPassword);

    const userCreated = await this.userRepository.addUserAccountCreated({
      ...entity,
      password: hashedPassword,
    });

    return {
      userId: userCreated.user_id.id,
    };
  }
}
