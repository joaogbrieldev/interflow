import { IRepositoryBase } from '../../../../../libs/shared/src/domain/contracts/infrastructure/repository-base';
import { JobApplication } from '../../job-application.aggregate';

export abstract class IJobApplicationRepository extends IRepositoryBase<JobApplication> {
  abstract createJobApplication(
    jobApplication: JobApplication,
  ): Promise<JobApplication>;

  abstract updateJobApplication(
    id: string,
    data: JobApplication,
  ): Promise<JobApplication>;

  abstract getJobApplicationsByUser(userId: string): Promise<JobApplication[]>;
}
