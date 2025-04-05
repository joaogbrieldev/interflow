import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  allModels,
  getDataSourceName,
} from 'src/nest-modules/postgres-module/typeorm.config';
import { IUserRepository } from '../domain/contracts/repository/user.repository';
import { UserRepositoryAdapter } from './user-repository.adapter';

const userRepositoryProvider: Provider = {
  provide: IUserRepository,
  useClass: UserRepositoryAdapter,
};
@Module({
  imports: [TypeOrmModule.forFeature([...allModels], getDataSourceName())],
  providers: [userRepositoryProvider],
  exports: [userRepositoryProvider],
})
export class UserRepositoryModule {}
