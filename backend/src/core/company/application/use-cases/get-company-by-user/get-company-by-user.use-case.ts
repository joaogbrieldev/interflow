import { ICompanyRepository } from '@core/company/domain/contracts/repository/company.repository';
import {
  IGetCompaniesByUserInput,
  IGetCompaniesByUserOutput,
  IGetCompanyByUserUseCase,
} from '@core/company/domain/contracts/use-cases/get-company-by-user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetCompaniesByUserUseCase implements IGetCompanyByUserUseCase {
  constructor(private readonly companyRepository: ICompanyRepository) {}
  async execute(
    input: IGetCompaniesByUserInput,
  ): Promise<IGetCompaniesByUserOutput> {
    const companies = await this.companyRepository.getMany(
      { user: { id: input.userId } },
      undefined,
      ['user'],
    );
    return companies;
  }
}
