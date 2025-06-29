import { DeleteCompanyDataModule } from '@core/company/application/use-cases/delete-company/delete-company.module';
import { Module } from '@nestjs/common';
import { DeleteCompanyController } from './delete-company.controller';

@Module({
  imports: [DeleteCompanyDataModule],
  controllers: [DeleteCompanyController],
  providers: [],
})
export class DeleteCompanyModule {}
