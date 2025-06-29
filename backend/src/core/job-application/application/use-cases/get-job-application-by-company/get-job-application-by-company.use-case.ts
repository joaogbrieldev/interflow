import { IJobApplicationRepository } from '@core/job-application/domain/contracts/repository/job-application.repository';
import {
  IGetJobApplicationsByCompanyInput,
  IGetJobApplicationsByCompanyUseCase,
} from '@core/job-application/domain/contracts/use-cases/get-job-application-by-company';
import { JobApplication } from '@core/job-application/domain/job-application.aggregate';
import { Injectable } from '@nestjs/common';
import { IPaginatedResult } from 'src/libs/shared/src/domain/contracts/infrastructure/repository-base';

@Injectable()
export class GetJobApplicationsByCompanyUseCase
  implements IGetJobApplicationsByCompanyUseCase
{
  constructor(
    private readonly _JobApplicationRepository: IJobApplicationRepository,
  ) {}

  async execute(
    input: IGetJobApplicationsByCompanyInput,
  ): Promise<IPaginatedResult<JobApplication>> {
    const { companyId } = input;
    const jobApplications = await this._JobApplicationRepository.paginate(
      input.page,
      25,
      { company: { id: companyId } },
      undefined,
      ['user'],
    );
    console.log(jobApplications);
    return jobApplications;
  }
}
