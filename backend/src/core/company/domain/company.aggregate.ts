import { User } from '@core/user/domain/user.aggregate';
import { EntityBase } from 'src/libs/shared/src/data-layer/entities/entity-base';
import { Email } from 'src/libs/shared/src/domain/models/value-objects/email';
import { Phone } from 'src/libs/shared/src/domain/models/value-objects/phone';
import { Contact } from './contact.vo';

export type CompanyConstructorProps = {
  id?: string;
  email: string;
  name: string;
  phone: string;
  contact: Contact[];
  company_website: string;
  user: User;
  country: string;
};

export type CompanyCreateCommand = {
  email: string;
  name: string;
  phone: string;
  contact: Contact[];
  company_website: string;
  user: User;
  country: string;
};

export class CompanyAggregate extends EntityBase {
  email: Email;
  name: string;
  phone: Phone;
  contact: Contact[];
  company_website: string;
  user: User;
  country: string;

  constructor(props: CompanyConstructorProps) {
    super();
    Object.assign(this, props);
  }

  static create(props: CompanyCreateCommand) {
    const company = new CompanyAggregate({ ...props });
    return company;
  }

  defineName(name: string): CompanyAggregate {
    this.name = name;
    return this;
  }

  defineEmail(email: string): CompanyAggregate {
    this.email = new Email(email);
    return this;
  }

  definePhone(phone: string): CompanyAggregate {
    this.phone = new Phone(phone);
    return this;
  }

  defineContact(name: string, role: string): CompanyAggregate {
    this.contact.push({
      name: name,
      role: role,
    });
    return this;
  }

  defineWebsite(website: string): CompanyAggregate {
    this.company_website = website;
    return this;
  }

  defineCountry(country: string): CompanyAggregate {
    this.country = country;
    return this;
  }
}
