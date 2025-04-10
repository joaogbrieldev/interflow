import { IJobApplicationRepository } from '@core/job-application/domain/contracts/repository/job-application.repository';
import {
  ICreateJobApplicationInput,
  ICreateJobApplicationOutput,
  ICreateJobApplicationUseCase,
} from '@core/job-application/domain/contracts/use-cases/create-job-application';
import { JobApplication } from '@core/job-application/domain/job-application.aggregate';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateJobApplicationUseCase
  implements ICreateJobApplicationUseCase
{
  constructor(
    private readonly jobApplicationRepository: IJobApplicationRepository,
  ) {}

  async execute({
    name,
    link,
    status,
    salary,
    isEquity,
    isInternational,
    userId,
    companyName,
    interviewDate,
    directContact,
    userFellings,
    companyFeedback,
  }: ICreateJobApplicationInput): Promise<ICreateJobApplicationOutput> {
    const entity = JobApplication.create({
      name,
      link,
      status,
      salary,
      isEquity,
      isInternational,
      user_id: userId,
      company_name: companyName,
      interviewDate: interviewDate,
      directContact,
      userFellings,
      companyFeedback,
    });

    const jobApplicationCreated =
      await this.jobApplicationRepository.createJobApplication(entity);

    return {
      jobApplicationId: jobApplicationCreated.job_application_id.id,
    };
  }
}
