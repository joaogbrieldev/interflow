import { CompanyAggregate } from '@core/company/domain/company.aggregate';

export class UpdateCompanyOutputDto {
  company: CompanyAggregate;

  constructor(company: CompanyAggregate) {
    this.company = company;
  }
}
