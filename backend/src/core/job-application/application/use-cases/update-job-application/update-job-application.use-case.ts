import { IJobApplicationRepository } from '@core/job-application/domain/contracts/repository/job-application.repository';
import {
  IUpdateJobApplicationsInput,
  IUpdateJobApplicationsUseCase,
} from '@core/job-application/domain/contracts/use-cases/update-job-application';
import { JobApplication } from '@core/job-application/domain/job-application.aggregate';
import { Injectable } from '@nestjs/common';
import { throwsException } from 'src/libs/shared/src/data-layer/helper/exception';

import { InvalidParamError } from 'src/libs/shared/src/domain/errors/application';

@Injectable()
export class UpdateJobApplicationUseCase
  implements IUpdateJobApplicationsUseCase
{
  constructor(
    private readonly _jobApplicationRepository: IJobApplicationRepository,
  ) {}

  async execute(input: IUpdateJobApplicationsInput): Promise<JobApplication> {
    const {
      jobApplicationsId,
      name,
      link,
      status,
      salary,
      isEquity,
      isInternational,
      companyName,
      userFellings,
      companyFeedback,
    } = input;
    await this._validateJobApplicationId(jobApplicationsId);
    const jobApplication: JobApplication =
      await this._jobApplicationRepository.get(jobApplicationsId);

    jobApplication
      .defineName(name)
      .defineLink(link)
      .updateStatus(status)
      .updateSalary(salary)
      .updateCompanyName(companyName)
      .updateUserFellings(userFellings)
      .updateUCompanyFeedback(companyFeedback)
      .updateInternational(isInternational)
      .updateEquity(isEquity);

    await this._jobApplicationRepository.updateJobApplication(
      jobApplicationsId,
      jobApplication,
    );

    return jobApplication;
  }

  private async _validateJobApplicationId(
    jobApplicationId: string,
  ): Promise<void> {
    const hasJobApplication: boolean =
      await this._jobApplicationRepository.exists({
        id: jobApplicationId,
      });
    if (!hasJobApplication) throwsException(new InvalidParamError('userId'));
  }
}
