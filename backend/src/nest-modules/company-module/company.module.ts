import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateCompanyModule } from './create-company/create-company.module';
import { GetJobAppicationModule } from './get-application-job/get-companies.module';

@Module({
  imports: [
    CreateCompanyModule,
    GetJobAppicationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class CompanyModule {}
