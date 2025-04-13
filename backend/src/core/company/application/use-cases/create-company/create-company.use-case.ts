import { CompanyAggregate } from '@core/company/domain/company.aggregate';
import { ICompanyRepository } from '@core/company/domain/contracts/repository/company.repository';
import {
  ICreateCompanyInput,
  ICreateCompanyUseCase,
} from '@core/company/domain/contracts/use-cases/create-company';

export class CreateCompanyUseCase implements ICreateCompanyUseCase {
  constructor(private readonly companyRepository: ICompanyRepository) {}
  async execute(input: ICreateCompanyInput): Promise<void> {
    const company = CompanyAggregate.create({
      email: input.email,
      name: input.name,
      phone: input.phone,
      contact: input.contact,
      status: input.status,
      company_website: input.company_website,
    });
    await this.companyRepository.create(company);
  }
}
