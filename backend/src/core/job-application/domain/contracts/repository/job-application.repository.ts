import { IRepositoryBase } from '../../../../../libs/shared/src/domain/contracts/infrastructure/repository-base';
import { JobApplication } from '../../job-application.aggregate';

export abstract class IJobApplicationRepository extends IRepositoryBase<JobApplication> {
  abstract updateJobApplication(
    id: string,
    data: JobApplication,
  ): Promise<JobApplication>;
}
