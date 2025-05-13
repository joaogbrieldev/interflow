import { GetCompaniesDataModule } from '@core/company/application/use-cases/get-company-by-user/get-company-by-user.module';
import { Module } from '@nestjs/common';
import { GetCompaniesController } from './get-companies.controller';
import { GetCompaniesDataMapper } from './get-companies.mapper';

@Module({
  imports: [GetCompaniesDataModule],
  controllers: [GetCompaniesController],
  providers: [GetCompaniesDataMapper],
})
export class GetJobAppicationModule {}
