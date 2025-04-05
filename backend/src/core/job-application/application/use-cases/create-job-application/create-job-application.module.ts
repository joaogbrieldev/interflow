import { ICreateJobApplicationUseCase } from '@core/job-application/domain/contracts/use-cases/create-job-application';
import { JobApplicationRepositoryModule } from '@core/job-application/infrastructure/job-application.module';
import { Module, Provider } from '@nestjs/common';
import { CreateJobApplicationUseCase } from './create-job-application.use-case';

export const createJobApplicationProvider: Provider = {
  useClass: CreateJobApplicationUseCase,
  provide: ICreateJobApplicationUseCase,
};

@Module({
  imports: [JobApplicationRepositoryModule],
  exports: [createJobApplicationProvider],
  providers: [createJobApplicationProvider],
})
export class CreateJobApplicationDataModule {}
