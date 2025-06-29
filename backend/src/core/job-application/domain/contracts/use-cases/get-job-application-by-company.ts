import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';
import { IPaginatedResult } from 'src/libs/shared/src/domain/contracts/infrastructure/repository-base';
import { JobApplication } from '../../job-application.aggregate';

export type IGetJobApplicationsByCompanyInput = {
  companyId: string;
  page: number;
};

export abstract class IGetJobApplicationsByCompanyUseCase
  implements
    IUseCase<
      IGetJobApplicationsByCompanyInput,
      IPaginatedResult<JobApplication>
    >
{
  abstract execute(
    input: IGetJobApplicationsByCompanyInput,
  ): Promise<IPaginatedResult<JobApplication>>;
}
