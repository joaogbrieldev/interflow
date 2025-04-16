import { CompanyAggregate } from '@core/company/domain/company.aggregate';
import { ICompanyRepository } from '@core/company/domain/contracts/repository/company.repository';
import {
  ICreateCompanyInput,
  ICreateCompanyOutput,
  ICreateCompanyUseCase,
} from '@core/company/domain/contracts/use-cases/create-company';

export class CreateCompanyUseCase implements ICreateCompanyUseCase {
  constructor(private readonly companyRepository: ICompanyRepository) {}
  async execute(input: ICreateCompanyInput): Promise<ICreateCompanyOutput> {
    const company = CompanyAggregate.create({
      email: input.email,
      name: input.name,
      phone: input.phone,
      contact: input.contact,
      company_website: input.company_website,
    });
    await this.companyRepository.create(company);

    return {
      companyId: company.id,
    };
  }
}
