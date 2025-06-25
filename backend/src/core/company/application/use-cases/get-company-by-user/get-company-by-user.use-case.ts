import { CompanyAggregate } from '@core/company/domain/company.aggregate';
import { ICompanyRepository } from '@core/company/domain/contracts/repository/company.repository';
import {
  IGetCompaniesByUserInput,
  IGetCompanyByUserUseCase,
} from '@core/company/domain/contracts/use-cases/get-company-by-user';
import { Injectable } from '@nestjs/common';
import { IPaginatedResult } from 'src/libs/shared/src/domain/contracts/infrastructure/repository-base';

@Injectable()
export class GetCompaniesByUserUseCase implements IGetCompanyByUserUseCase {
  constructor(private readonly companyRepository: ICompanyRepository) {}
  async execute(
    input: IGetCompaniesByUserInput,
  ): Promise<IPaginatedResult<CompanyAggregate>> {
    const companies = await this.companyRepository.paginate(
      input.page,
      25,
      { user: { id: input.userId } },
      undefined,
      ['user'],
    );
    return companies;
  }
}
