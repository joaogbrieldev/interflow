import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateCompanyModule } from './create-company/create-company.module';
import { GetJobAppicationModule } from './get-companies/get-companies.module';
import { UpdateCompanyModule } from './update-company/update-company.module';

@Module({
  imports: [
    CreateCompanyModule,
    GetJobAppicationModule,
    UpdateCompanyModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class CompanyModule {}
