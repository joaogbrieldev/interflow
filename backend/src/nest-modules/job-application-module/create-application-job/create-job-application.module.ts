import { CreateJobApplicationDataModule } from '@core/job-application/application/use-cases/create-job-application/create-job-application.module';
import { Module } from '@nestjs/common';
import { CreateJobApplicationController } from './create-job-application.controller';
import { CreateJobApplicationDataMapper } from './create-job-application.data-mapper';
import { CreateJobApplicationValidator } from './create-job-application.validator';

@Module({
  imports: [CreateJobApplicationDataModule],
  controllers: [CreateJobApplicationController],
  providers: [CreateJobApplicationDataMapper, CreateJobApplicationValidator],
})
export class CreateJobApplicationModule {}
