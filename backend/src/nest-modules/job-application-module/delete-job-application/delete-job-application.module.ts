import { DeleteJobApplicationDataModule } from '@core/job-application/application/use-cases/delete-job-application/delete-job-application.module';
import { Module } from '@nestjs/common';
import { DeleteJobApplicationController } from './delete-job-application.controller';

@Module({
  imports: [DeleteJobApplicationDataModule],
  controllers: [DeleteJobApplicationController],
  providers: [],
})
export class DeleteJobApplicationModule {}
