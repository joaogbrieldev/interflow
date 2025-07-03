import { Contact } from '@core/company/domain/contact.vo';
import { validateSync } from 'class-validator';

export type CreateCompanyInputConstructorProps = {
  email: string;
  name: string;
  phone: string;
  contact: Contact[];
  company_website: string;
  userId: string;
  country: string;
};

export class CreateCompanyInputDto {
  email: string;
  name: string;
  phone: string;
  contact: Contact[];
  company_website: string;
  userId: string;
  country: string;

  constructor(props: CreateCompanyInputConstructorProps) {
    if (!props) return;
    this.email = props.email;
    this.name = props.name;
    this.phone = props.phone;
    this.contact = props.contact;
    this.company_website = props.company_website;
    this.userId = props.userId;
    this.country = props.country;
  }
}

export class ValidateCreateCompanyInput {
  static validate(input: CreateCompanyInputDto) {
    return validateSync(input);
  }
}
