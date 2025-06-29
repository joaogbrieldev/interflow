import { GetJobApplicationsByCompanyDataModule } from '@core/job-application/application/use-cases/get-job-application-by-company/get-job-application-by-company.module';
import { Module } from '@nestjs/common';
import { GetJobApplicationsByCompanyController } from './get-job-applications-by-company.controller';
@Module({
  imports: [GetJobApplicationsByCompanyDataModule],
  controllers: [GetJobApplicationsByCompanyController],
  providers: [],
})
export class GetJobAppicationsByCompanyModule {}
