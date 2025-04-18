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
};

export type CompanyCreateCommand = {
  email: string;
  name: string;
  phone: string;
  contact: Contact[];
  company_website: string;
};

export enum CompanyStatus { // @to do - move for interview entity
  SENT = 'sent',
  interview = 'interview',
  TECHNICAL_TEST = 'technical_test',
  TECHNICAL_INTERVIEW = 'technical_interview',
  PROPOSAL = 'proposal',
}

export class CompanyAggregate extends EntityBase {
  email: Email;
  name: string;
  phone: Phone;
  contact: Contact[];
  company_website: string;

  constructor(props: CompanyConstructorProps) {
    super();
    Object.assign(this, props);
  }

  static create(props: CompanyCreateCommand) {
    const company = new CompanyAggregate({ ...props });
    return company;
  }
}
