import { CompanyAggregate } from '@core/company/domain/company.aggregate';
import { ICompanyRepository } from '@core/company/domain/contracts/repository/company.repository';
import {
  ICreateCompanyInput,
  ICreateCompanyOutput,
  ICreateCompanyUseCase,
} from '@core/company/domain/contracts/use-cases/create-company';
import { IUserRepository } from '@core/user/domain/contracts/repository/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateCompanyUseCase implements ICreateCompanyUseCase {
  constructor(
    private readonly companyRepository: ICompanyRepository,
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(input: ICreateCompanyInput): Promise<ICreateCompanyOutput> {
    const user = await this.userRepository.getOne({
      id: input.userId,
    });
    const company = CompanyAggregate.create({
      email: input.email,
      name: input.name,
      phone: input.phone,
      contact: input.contact,
      company_website: input.company_website,
      user,
    });
    await this.companyRepository.create(company);

    return {
      companyId: company.id,
    };
  }
}
