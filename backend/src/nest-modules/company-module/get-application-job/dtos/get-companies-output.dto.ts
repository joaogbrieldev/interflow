import { CompanyAggregate } from '@core/company/domain/company.aggregate';

export class GetCompaniesOutputDto {
  companies: CompanyAggregate[];
  constructor(companies: CompanyAggregate[]) {
    this.companies = companies;
  }
}
