import { ICreateInterviewUseCase } from '@core/interview/domain/contracts/use-cases/create-interview';
import { InterviewRepositoryModule } from '@core/interview/infrastructure/interview.module';
import { UserRepositoryModule } from '@core/user/infrastructure/user.module';
import { Module, Provider } from '@nestjs/common';
import { CreateInterviewUseCase } from './create-interview.use-case';

export const createInterviewProvider: Provider = {
  useClass: CreateInterviewUseCase,
  provide: ICreateInterviewUseCase,
};

@Module({
  imports: [InterviewRepositoryModule, UserRepositoryModule],
  exports: [createInterviewProvider],
  providers: [createInterviewProvider],
})
export class CreateInterviewDataModule {}
