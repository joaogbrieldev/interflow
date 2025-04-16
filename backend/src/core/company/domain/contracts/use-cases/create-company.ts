import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';
import { Contact } from '../../contact.vo';

export type ICreateCompanyInput = {
  email: string;
  name: string;
  phone: string;
  contact: Contact[];
  company_website: string;
};

export type ICreateCompanyOutput = {
  companyId: string;
};

export abstract class ICreateCompanyUseCase
  implements IUseCase<ICreateCompanyInput, ICreateCompanyOutput>
{
  abstract execute(input: ICreateCompanyInput): Promise<ICreateCompanyOutput>;
}
