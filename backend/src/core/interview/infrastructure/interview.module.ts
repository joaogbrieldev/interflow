import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  allModels,
  getDataSourceName,
} from 'src/nest-modules/postgres-module/typeorm.config';
import { IInterviewRepository } from '../domain/contracts/repository/interview.repository';
import { interviewRepositoryAdapter } from './interview-repository.adapter';

const InterviewRepositoryProvider: Provider = {
  provide: IInterviewRepository,
  useClass: interviewRepositoryAdapter,
};
@Module({
  imports: [TypeOrmModule.forFeature([...allModels], getDataSourceName())],
  providers: [InterviewRepositoryProvider],
  exports: [InterviewRepositoryProvider],
})
export class InterviewRepositoryModule {}
