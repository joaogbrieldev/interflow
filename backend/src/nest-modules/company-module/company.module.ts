import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateCompanyModule } from './create-company/create-company.module';
import { DeleteCompanyModule } from './delete-company/delete-company.module';
import { GetCompaniesModule } from './get-companies/get-companies.module';
import { UpdateCompanyModule } from './update-company/update-company.module';

@Module({
  imports: [
    CreateCompanyModule,
    GetCompaniesModule,
    UpdateCompanyModule,
    DeleteCompanyModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class CompanyModule {}
