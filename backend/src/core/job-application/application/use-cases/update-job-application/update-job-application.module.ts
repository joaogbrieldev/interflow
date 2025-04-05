import { IUpdateJobApplicationsUseCase } from '@core/job-application/domain/contracts/use-cases/update-job-application';
import { JobApplicationRepositoryModule } from '@core/job-application/infrastructure/job-application.module';
import { Module, Provider } from '@nestjs/common';
import { UpdateJobApplicationUseCase } from './update-job-application.use-case';

const UpdateJobApplicationProvider: Provider = {
  provide: IUpdateJobApplicationsUseCase,
  useClass: UpdateJobApplicationUseCase,
};

@Module({
  imports: [JobApplicationRepositoryModule],
  providers: [UpdateJobApplicationProvider],
  exports: [UpdateJobApplicationProvider],
})
export class UpdateJobApplicationDataModule {}
