import { IGetUserUseCase } from '@core/user/domain/contracts/use-cases/get-user';
import { UserRepositoryModule } from '@core/user/infrastructure/user.module';
import { Module, Provider } from '@nestjs/common';
import { GetUserUseCase } from './get-user.use-case';

const getUserProviders: Provider = {
  provide: IGetUserUseCase,
  useClass: GetUserUseCase,
};

@Module({
  imports: [UserRepositoryModule],
  providers: [getUserProviders],
  exports: [getUserProviders],
})
export class GetUserDataModule {}
