import { Contact } from '@core/company/domain/contact.vo';

export class UpdateCompanyInputDto {
  companyId: string;
  name?: string;
  email?: string;
  phone?: string;
  contact?: Contact;
  company_website?: string;
}
