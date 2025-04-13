import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';
import { Phone } from 'src/libs/shared/src/domain/models/value-objects/phone';
import { CompanyStatus } from '../../company.aggregate';
import { Contact } from '../../contact.vo';

export type ICreateCompanyInput = {
  email: string;
  name: string;
  phone: Phone;
  contact: Contact[];
  status: CompanyStatus;
  company_website: string;
};

export type ICreateCompanyOutput = void;

export abstract class ICreateCompanyUseCase
  implements IUseCase<ICreateCompanyInput, ICreateCompanyOutput>
{
  abstract execute(input: ICreateCompanyInput): Promise<void>;
}
