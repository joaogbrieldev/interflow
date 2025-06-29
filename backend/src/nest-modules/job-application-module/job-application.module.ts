import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateJobApplicationModule } from './create-application-job/create-job-application.module';
import { DeleteJobApplicationModule } from './delete-job-application/delete-job-application.module';
import { GetJobAppicationModule } from './get-application-job/get-application-job.module';
import { GetJobAppicationsByCompanyModule } from './get-job-applications-by-company/get-job-applications-by-company.module';
import { UpdateJobApplicationModule } from './update-application-job/update-application-job.module';

@Module({
  imports: [
    CreateJobApplicationModule,
    GetJobAppicationModule,
    UpdateJobApplicationModule,
    GetJobAppicationsByCompanyModule,
    DeleteJobApplicationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class JobApplicationModule {}
