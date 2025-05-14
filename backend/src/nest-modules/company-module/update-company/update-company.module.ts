import { UpdateCompanyDataModule } from '@core/company/application/use-cases/update-company/update-company.module';
import { Module } from '@nestjs/common';
import { UpdateCompanyController } from './update-company.controller';

@Module({
  imports: [UpdateCompanyDataModule],
  controllers: [UpdateCompanyController],
})
export class UpdateCompanyModule {}
