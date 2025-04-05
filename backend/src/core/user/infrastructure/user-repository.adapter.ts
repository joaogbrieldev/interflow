import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepositoryPostgresAdapter } from 'src/libs/shared/src/infrastructure/db/postgres/base-repository.adapter';
import { getDataSourceName } from 'src/nest-modules/postgres-module/typeorm.config';
import { Repository } from 'typeorm';
import { IUserRepository } from '../domain/contracts/repository/user.repository';
import { User, UserId } from '../domain/user.aggregate';
import { UserModel } from './user.model';

@Injectable()
export class UserRepositoryAdapter
  extends BaseRepositoryPostgresAdapter<User, UserModel>
  implements IUserRepository
{
  constructor(
    @InjectRepository(UserModel, getDataSourceName())
    private readonly _userRepository: Repository<UserModel>,
  ) {
    super(_userRepository, UserModel);
  }

  mapToDomain(normalizedPersistencyObject: UserModel): User {
    const user: User = new User({
      user_id: new UserId(normalizedPersistencyObject.id),
      name: normalizedPersistencyObject.name,
      email: normalizedPersistencyObject.email,
    });
    return user;
  }
  async addUserAccountCreated(user: User): Promise<User> {
    const userEntity = this._userRepository.create(user);
    const userCreated = await this._userRepository.save(userEntity);
    return this.mapToDomain(userCreated);
  }
  async getUserByEmail(email: string) {
    const user = await this._userRepository.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }
}
