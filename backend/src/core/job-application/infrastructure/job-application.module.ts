import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  allModels,
  getDataSourceName,
} from 'src/nest-modules/postgres-module/typeorm.config';
import { IJobApplicationRepository } from '../domain/contracts/repository/job-application.repository';
import { JobApplicationRepositoryAdapter } from './job-application-repository.adapter';

const JobApplicationRepositoryProvider: Provider = {
  provide: IJobApplicationRepository,
  useClass: JobApplicationRepositoryAdapter,
};
@Module({
  imports: [TypeOrmModule.forFeature([...allModels], getDataSourceName())],
  providers: [JobApplicationRepositoryProvider],
  exports: [JobApplicationRepositoryProvider],
})
export class JobApplicationRepositoryModule {}
