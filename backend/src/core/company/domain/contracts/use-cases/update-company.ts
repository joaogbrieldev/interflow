import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';
import { CompanyAggregate } from '../../company.aggregate';
import { Contact } from '../../contact.vo';

export interface IUpdateCompanyInput {
  companyId: string;
  name?: string;
  email?: string;
  phone?: string;
  contact?: Contact;
  company_website?: string;
}

export type IUpdateCompanyOutput = CompanyAggregate;

export abstract class IUpdateCompanyUseCase
  implements IUseCase<IUpdateCompanyInput, IUpdateCompanyOutput>
{
  abstract execute(input: IUpdateCompanyInput): Promise<IUpdateCompanyOutput>;
}
