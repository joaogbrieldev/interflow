import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';
import { CompanyAggregate } from '../../company.aggregate';

export type IGetCompaniesByUserInput = {
  userId: string;
};
export type IGetCompaniesByUserOutput = CompanyAggregate[];

export abstract class IGetCompanyByUserUseCase
  implements IUseCase<IGetCompaniesByUserInput, IGetCompaniesByUserOutput>
{
  abstract execute(
    input: IGetCompaniesByUserInput,
  ): Promise<IGetCompaniesByUserOutput>;
}
