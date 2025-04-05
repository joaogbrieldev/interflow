import { AuthenticateDataModule } from '@core/user/application/use-cases/authenticate/authenticate.module';
import { Module } from '@nestjs/common';
import { SigninController } from './signin.controller';
import { SigninDataMapper } from './signin.data-mapper';
import { SigninValidator } from './signin.validator';

@Module({
  imports: [AuthenticateDataModule],
  providers: [SigninDataMapper, SigninValidator],
  controllers: [SigninController],
})
export class SigninModule {}
