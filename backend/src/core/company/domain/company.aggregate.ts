import { EntityBase } from 'src/libs/shared/src/data-layer/entities/entity-base';
import { Email } from 'src/libs/shared/src/domain/models/value-objects/email';
import { Phone } from 'src/libs/shared/src/domain/models/value-objects/phone';
import { Uuid } from 'src/libs/shared/src/domain/models/value-objects/uuid.vo';
import { Contact } from './contact.vo';

export class CompanyId extends Uuid {}

export type CompanyConstructorProps = {
  company_id?: CompanyId;
  email: string;
  name: string;
  phone: Phone;
  contact: Contact[];
  status: CompanyStatus;
  company_website: string;
};

export type CompanyCreateCommand = {
  email: string;
  name: string;
  phone: Phone;
  contact: Contact[];
  status: CompanyStatus;
  company_website: string;
};

export enum CompanyStatus {
  SENT = 'sent',
  interview = 'interview',
  TECHNICAL_TEST = 'technical_test',
  TECHNICAL_INTERVIEW = 'technical_interview',
  PROPOSAL = 'proposal',
}

export class CompanyAggregate extends EntityBase {
  company_id: CompanyId;
  email: Email;
  name: string;
  phone: Phone;
  contact: Contact[];
  status: CompanyStatus;
  company_website: string;

  constructor(props: CompanyConstructorProps) {
    super();
    this.company_id = props.company_id ?? new CompanyId();
    this.email = new Email(props.email);
    this.name = props.name;
    this.phone = props.phone;
    this.contact = props.contact;
    this.status = props.status;
    this.company_website = props.company_website;
  }

  static create(props: CompanyCreateCommand) {
    const company = new CompanyAggregate({ ...props });
    return company;
  }
}
