import { IJobApplicationRepository } from '@core/job-application/domain/contracts/repository/job-application.repository';
import {
  IGetJobApplicationsInput,
  IGetJobApplicationsUseCase,
} from '@core/job-application/domain/contracts/use-cases/get-job-application';
import { JobApplication } from '@core/job-application/domain/job-application.aggregate';
import { Injectable } from '@nestjs/common';
import { IPaginatedResult } from 'src/libs/shared/src/domain/contracts/infrastructure/repository-base';

@Injectable()
export class GetJobApplicationUseCase implements IGetJobApplicationsUseCase {
  constructor(
    private readonly _JobApplicationRepository: IJobApplicationRepository,
  ) {}

  async execute(
    input: IGetJobApplicationsInput,
  ): Promise<IPaginatedResult<JobApplication>> {
    const { userId } = input;
    const jobApplications = await this._JobApplicationRepository.paginate(
      input.page,
      25,
      { user: { id: userId } },
      undefined,
      ['user'],
    );
    return jobApplications;
  }
}
