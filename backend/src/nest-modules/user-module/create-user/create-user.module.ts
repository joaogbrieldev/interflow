import { CreateUserDataModule } from '@core/user/application/use-cases/create-user/create-user.module';
import { Module } from '@nestjs/common';
import { CreateUserController } from './create-user.controller';
import { CreateUserDataMapper } from './create-user.data-mapper';
import { CreateUserValidator } from './create-user.validator';

@Module({
  imports: [CreateUserDataModule],
  controllers: [CreateUserController],
  providers: [CreateUserDataMapper, CreateUserValidator],
})
export class CreateUserModule {}
