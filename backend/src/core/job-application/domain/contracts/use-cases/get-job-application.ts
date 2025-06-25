import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';
import { IPaginatedResult } from 'src/libs/shared/src/domain/contracts/infrastructure/repository-base';
import { JobApplication } from '../../job-application.aggregate';

export type IGetJobApplicationsInput = {
  userId: string;
  page: number;
};

export abstract class IGetJobApplicationsUseCase
  implements
    IUseCase<IGetJobApplicationsInput, IPaginatedResult<JobApplication>>
{
  abstract execute(
    input: IGetJobApplicationsInput,
  ): Promise<IPaginatedResult<JobApplication>>;
}
