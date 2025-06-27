import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';

export type IDeleteCompanyInput = {
  companyId: string;
};

export type IDeleteCompanyOutput = {
  companyId: string;
};

export abstract class IDeleteCompanyUseCase
  implements IUseCase<IDeleteCompanyInput, IDeleteCompanyOutput>
{
  abstract execute(input: IDeleteCompanyInput): Promise<IDeleteCompanyOutput>;
}
