import { IJobApplicationRepository } from '@core/job-application/domain/contracts/repository/job-application.repository';
import {
  IGetJobApplicationsInput,
  IGetJobApplicationsOutput,
  IGetJobApplicationsUseCase,
} from '@core/job-application/domain/contracts/use-cases/get-job-application';
import { JobApplication } from '@core/job-application/domain/job-application.aggregate';
import { Injectable } from '@nestjs/common';
import { throwsException } from 'src/libs/shared/src/data-layer/helper/exception';
import { NotFoundError } from 'src/libs/shared/src/domain/errors/application/not-found.error';

@Injectable()
export class GetJobApplicationUseCase implements IGetJobApplicationsUseCase {
  constructor(
    private readonly _JobApplicationRepository: IJobApplicationRepository,
  ) {}

  async execute(
    input: IGetJobApplicationsInput,
  ): Promise<IGetJobApplicationsOutput> {
    const { userId } = input;
    const jobApplication: JobApplication[] =
      await this._JobApplicationRepository.getJobApplicationsByUser(userId);
    if (!jobApplication)
      throwsException(new NotFoundError('JobApplication not found'));
    return jobApplication;
  }
}
