import { UpdateJobApplicationDataModule } from '@core/job-application/application/use-cases/update-job-application/update-job-application.module';
import { Module } from '@nestjs/common';
import { UpdateJobApplicationController } from './update-application-job-table.controller';

@Module({
  imports: [UpdateJobApplicationDataModule],
  controllers: [UpdateJobApplicationController],
})
export class UpdateJobApplicationModule {}
