import { ICompanyRepository } from '@core/company/domain/contracts/repository/company.repository';
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
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute({
    link,
    status,
    salary,
    isEquity,
    isInternational,
    userId,
    position,
    companyId,
    name,
  }: ICreateJobApplicationInput): Promise<ICreateJobApplicationOutput> {
    const user = await this.userRepository.getOne({
      id: userId,
    });
    const company = await this.companyRepository.getOne({ id: companyId });
    const entity = JobApplication.create({
      link,
      status,
      salary,
      isEquity,
      isInternational,
      user,
      position,
      company,
      name,
    });

    const jobApplicationCreated: JobApplication =
      await this.jobApplicationRepository.create(entity);

    return {
      jobApplicationId: jobApplicationCreated.id,
    };
  }
}
