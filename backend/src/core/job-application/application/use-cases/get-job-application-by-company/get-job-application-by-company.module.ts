import { IGetJobApplicationsByCompanyUseCase } from '@core/job-application/domain/contracts/use-cases/get-job-application-by-company';
import { JobApplicationRepositoryModule } from '@core/job-application/infrastructure/job-application.module';
import { Module, Provider } from '@nestjs/common';
import { GetJobApplicationsByCompanyUseCase } from './get-job-application-by-company.use-case';

const GetJobApplicationsByCompanyProviders: Provider = {
  provide: IGetJobApplicationsByCompanyUseCase,
  useClass: GetJobApplicationsByCompanyUseCase,
};

@Module({
  imports: [JobApplicationRepositoryModule],
  providers: [GetJobApplicationsByCompanyProviders],
  exports: [GetJobApplicationsByCompanyProviders],
})
export class GetJobApplicationsByCompanyDataModule {}
