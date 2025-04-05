import { GetJobApplicationsDataModule } from '@core/job-application/application/use-cases/get-job-application/get-job-application.module';
import { Module } from '@nestjs/common';
import { GetJobApplicationController } from './get-application-job.controller';
import { GetJobApplicationDataMapper } from './get-application-job.mapper';

@Module({
  imports: [GetJobApplicationsDataModule],
  controllers: [GetJobApplicationController],
  providers: [GetJobApplicationDataMapper],
})
export class GetJobAppicationModule {}
