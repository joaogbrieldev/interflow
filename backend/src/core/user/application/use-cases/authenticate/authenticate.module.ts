import { UserRepositoryModule } from '@core/user/infrastructure/user.module';
import { Module } from '@nestjs/common';

import { IAuthenticate } from '@core/user/domain/contracts/use-cases/authenticate';
import { Provider } from '@nestjs/common';
import { EncrypterModule } from 'src/libs/shared/src/infrastructure/db/postgres/services/encrypter/encrypter.module';
import { JwtServiceModule } from 'src/libs/shared/src/infrastructure/db/postgres/services/jwt/jwt-service.module';
import { Authenticate } from './authenticate.use-case';

export const AuthenticateProvider: Provider = {
  provide: IAuthenticate,
  useClass: Authenticate,
};

@Module({
  imports: [UserRepositoryModule, JwtServiceModule, EncrypterModule],
  providers: [AuthenticateProvider],
  exports: [AuthenticateProvider],
})
export class AuthenticateDataModule {}
