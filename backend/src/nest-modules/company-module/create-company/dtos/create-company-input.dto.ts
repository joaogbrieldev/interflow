import { CompanyStatus } from '@core/company/domain/company.aggregate';
import { Contact } from '@core/company/domain/contact.vo';
import { validateSync } from 'class-validator';
import { Phone } from 'src/libs/shared/src/domain/models/value-objects/phone';

export type CreateCompanyInputConstructorProps = {
  email: string;
  name: string;
  phone: Phone;
  contact: Contact[];
  status: CompanyStatus;
  company_website: string;
};

export class CreateCompanyInputDto {
  email: string;
  name: string;
  phone: Phone;
  contact: Contact[];
  status: CompanyStatus;
  company_website: string;

  constructor(props: CreateCompanyInputConstructorProps) {
    if (!props) return;
    this.email = props.email;
    this.name = props.name;
    this.phone = props.phone;
    this.contact = props.contact;
    this.status = props.status;
    this.company_website = props.company_website;
  }
}

export class ValidateCreateCompanyInput {
  static validate(input: CreateCompanyInputDto) {
    return validateSync(input);
  }
}
