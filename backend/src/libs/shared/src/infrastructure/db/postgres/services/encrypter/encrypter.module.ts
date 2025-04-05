import { Global, Module, Provider } from '@nestjs/common';
import { IEncrypter } from 'src/libs/shared/src/domain/contracts/infrastructure/services/encrypter.service';
import { EncrypterAdapter } from './encrypter.adapter';

export const EncrypterProvider: Provider = {
  provide: IEncrypter,
  useClass: EncrypterAdapter,
};

@Global()
@Module({
  providers: [EncrypterProvider],
  exports: [EncrypterProvider],
})
export class EncrypterModule {}
