import { Injectable } from '@nestjs/common';
import { IJobApplicationRepository } from 'src/core/job-application/domain/contracts/repository/job-application.repository';
import {
  IDeleteJobApplicationInput,
  IDeleteJobApplicationOutput,
  IDeleteJobApplicationUseCase,
} from 'src/core/job-application/domain/contracts/use-cases/delete-job-application';
import { NotFoundError } from 'src/libs/shared/src/domain/errors/application/not-found.error';

@Injectable()
export class DeleteJobApplicationUseCase
  implements IDeleteJobApplicationUseCase
{
  constructor(
    private readonly jobApplicationRepository: IJobApplicationRepository,
  ) {}

  async execute(
    input: IDeleteJobApplicationInput,
  ): Promise<IDeleteJobApplicationOutput> {
    const jobApplication = await this.jobApplicationRepository.getOne({
      id: input.jobApplicationId,
    });

    if (!jobApplication) {
      throw new NotFoundError('Job application not found');
    }

    await this.jobApplicationRepository.delete(jobApplication.id);

    return { jobApplicationId: input.jobApplicationId };
  }
}
