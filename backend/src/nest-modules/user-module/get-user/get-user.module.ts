import { GetUserDataModule } from '@core/user/application/use-cases/get-user/get-user.module';
import { Module } from '@nestjs/common';
import { JwtAuthGuard } from 'src/libs/shared/src/data-layer/jwt-service/jwt-adapter.service';
import { JwtServiceModule } from 'src/libs/shared/src/infrastructure/db/postgres/services/jwt/jwt-service.module';
import { GetUserController } from './get-user.controller';
import { GetUserDataMapper } from './get-user.mapper';

@Module({
  imports: [GetUserDataModule, JwtServiceModule],
  controllers: [GetUserController],
  providers: [GetUserDataMapper, JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class GetUserModule {}
