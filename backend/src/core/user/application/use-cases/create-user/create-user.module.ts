import { ICreateUserUseCase } from '@core/user/domain/contracts/use-cases/create-user';
import { UserRepositoryModule } from '@core/user/infrastructure/user.module';
import { Module, Provider } from '@nestjs/common';
import { EncrypterModule } from 'src/libs/shared/src/infrastructure/db/postgres/services/encrypter/encrypter.module';
import { CreateUserUseCase } from './create-user.use-case';

export const createUserProvider: Provider = {
  useClass: CreateUserUseCase,
  provide: ICreateUserUseCase,
};

@Module({
  imports: [UserRepositoryModule, EncrypterModule],
  exports: [createUserProvider],
  providers: [createUserProvider],
})
export class CreateUserDataModule {}
