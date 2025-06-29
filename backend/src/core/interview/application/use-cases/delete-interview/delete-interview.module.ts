import { IDeleteInterviewUseCase } from '@core/interview/domain/contracts/use-cases/delete-interview';
import { InterviewRepositoryModule } from '@core/interview/infrastructure/interview.module';
import { Module, Provider } from '@nestjs/common';
import { DeleteInterviewUseCase } from './delete-interview.use-case';

const DeleteInterviewProviders: Provider = {
  provide: IDeleteInterviewUseCase,
  useClass: DeleteInterviewUseCase,
};

@Module({
  imports: [InterviewRepositoryModule],
  providers: [DeleteInterviewProviders],
  exports: [DeleteInterviewProviders],
})
export class DeleteInterviewDataModule {}
