import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';
import { IPaginatedResult } from 'src/libs/shared/src/domain/contracts/infrastructure/repository-base';
import { CompanyAggregate } from '../../company.aggregate';

export type IGetCompaniesByUserInput = {
  userId: string;
  page: number;
};

export abstract class IGetCompanyByUserUseCase
  implements
    IUseCase<IGetCompaniesByUserInput, IPaginatedResult<CompanyAggregate>>
{
  abstract execute(
    input: IGetCompaniesByUserInput,
  ): Promise<IPaginatedResult<CompanyAggregate>>;
}
