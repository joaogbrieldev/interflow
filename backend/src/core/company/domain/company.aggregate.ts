import { Email } from 'src/libs/shared/src/domain/models/value-objects/email';
import { Phone } from 'src/libs/shared/src/domain/models/value-objects/phone';
import { Uuid } from 'src/libs/shared/src/domain/models/value-objects/uuid.vo';
import { Contact } from './contact.vo';

export class CompanyId extends Uuid {}

export enum CompanyStatus {
  SENT = 'sent',
  interview = 'interview',
  TECHNICAL_TEST = 'technical_test',
  TECHNICAL_INTERVIEW = 'technical_interview',
  PROPOSAL = 'proposal',
}

export class CompanyAggregate {
  company_id: CompanyId;
  email: Email;
  name: string;
  phone: Phone;
  contact: Contact[];
  status: CompanyStatus;
  company_website: string;
}
