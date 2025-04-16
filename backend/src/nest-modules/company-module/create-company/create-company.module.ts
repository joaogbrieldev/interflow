import { CreateCompanyDataModule } from '@core/company/application/use-cases/create-company/create-company.module';
import { Module } from '@nestjs/common';
import { CreateCompanyController } from './create-company.controller';
import { CreateCompanyDataMapper } from './create-company.data-mapper';
import { CreateCompanyValidator } from './create-company.validator';

@Module({
  imports: [CreateCompanyDataModule],
  controllers: [CreateCompanyController],
  providers: [CreateCompanyDataMapper, CreateCompanyValidator],
})
export class CreateCompanyModule {}
