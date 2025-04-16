import { IJobApplicationRepository } from '@core/job-application/domain/contracts/repository/job-application.repository';
import {
  ICreateJobApplicationInput,
  ICreateJobApplicationOutput,
  ICreateJobApplicationUseCase,
} from '@core/job-application/domain/contracts/use-cases/create-job-application';
import { JobApplication } from '@core/job-application/domain/job-application.aggregate';
import { IUserRepository } from '@core/user/domain/contracts/repository/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateJobApplicationUseCase
  implements ICreateJobApplicationUseCase
{
  constructor(
    private readonly jobApplicationRepository: IJobApplicationRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({
    name,
    link,
    status,
    salary,
    isEquity,
    isInternational,
    userId,
  }: ICreateJobApplicationInput): Promise<ICreateJobApplicationOutput> {
    const user = await this.userRepository.getOne({
      id: userId,
    });

    const entity = JobApplication.create({
      name,
      link,
      status,
      salary,
      isEquity,
      isInternational,
      user,
    });

    const jobApplicationCreated =
      await this.jobApplicationRepository.create(entity);

    return {
      jobApplicationId: jobApplicationCreated.job_application_id.id,
    };
  }
}
