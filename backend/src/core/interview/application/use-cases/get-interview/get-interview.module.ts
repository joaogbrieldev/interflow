import { IGetInterviewsUseCase } from '@core/interview/domain/contracts/use-cases/get-interview';
import { InterviewRepositoryModule } from '@core/interview/infrastructure/interview.module';
import { Module, Provider } from '@nestjs/common';
import { GetInterviewUseCase } from './get-interview.use-case';

const getInterviewProviders: Provider = {
  provide: IGetInterviewsUseCase,
  useClass: GetInterviewUseCase,
};

@Module({
  imports: [InterviewRepositoryModule],
  providers: [getInterviewProviders],
  exports: [getInterviewProviders],
})
export class GetInterviewDataModule {}
