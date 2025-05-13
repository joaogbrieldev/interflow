import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';
import { Email } from 'src/libs/shared/src/domain/models/value-objects/email';
import { Phone } from 'src/libs/shared/src/domain/models/value-objects/phone';
import { Contact } from '../../contact.vo';

export type IGetCompaniesByUserInput = {
  userId: string;
};
export type IGetCompaniesByUserOutput = {
  email: Email;
  name: string;
  phone: Phone;
  contact: Contact[];
  company_website: string;
}[];

export abstract class IGetCompanyByUserUseCase
  implements IUseCase<IGetCompaniesByUserInput, IGetCompaniesByUserOutput>
{
  abstract execute(
    input: IGetCompaniesByUserInput,
  ): Promise<IGetCompaniesByUserOutput>;
}
