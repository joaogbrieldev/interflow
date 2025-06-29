import { IDeleteJobApplicationUseCase } from '@core/job-application/domain/contracts/use-cases/delete-job-application';
import { JobApplicationRepositoryModule } from '@core/job-application/infrastructure/job-application.module';
import { Module, Provider } from '@nestjs/common';
import { DeleteJobApplicationUseCase } from './delete-job-application.use-case';

const DeleteJobApplicationProviders: Provider = {
  provide: IDeleteJobApplicationUseCase,
  useClass: DeleteJobApplicationUseCase,
};

@Module({
  imports: [JobApplicationRepositoryModule],
  providers: [DeleteJobApplicationProviders],
  exports: [DeleteJobApplicationProviders],
})
export class DeleteJobApplicationDataModule {}
