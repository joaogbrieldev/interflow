import { IUpdateInterviewUseCase } from '@core/interview/domain/contracts/use-cases/update-interview';
import { InterviewRepositoryModule } from '@core/interview/infrastructure/interview.module';
import { Module, Provider } from '@nestjs/common';
import { UpdateInterviewUseCase } from './update-interview.use-case';

const UpdateInterviewProvider: Provider = {
  provide: IUpdateInterviewUseCase,
  useClass: UpdateInterviewUseCase,
};

@Module({
  imports: [InterviewRepositoryModule],
  providers: [UpdateInterviewProvider],
  exports: [UpdateInterviewProvider],
})
export class UpdateInterviewDataModule {}
