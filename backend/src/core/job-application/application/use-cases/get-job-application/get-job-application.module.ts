import { IGetJobApplicationsUseCase } from '@core/job-application/domain/contracts/use-cases/get-job-application';
import { JobApplicationRepositoryModule } from '@core/job-application/infrastructure/job-application.module';
import { Module, Provider } from '@nestjs/common';
import { GetJobApplicationUseCase } from './get-job-application.use-case';

const getJobApplicationsProviders: Provider = {
  provide: IGetJobApplicationsUseCase,
  useClass: GetJobApplicationUseCase,
};

@Module({
  imports: [JobApplicationRepositoryModule],
  providers: [getJobApplicationsProviders],
  exports: [getJobApplicationsProviders],
})
export class GetJobApplicationsDataModule {}
