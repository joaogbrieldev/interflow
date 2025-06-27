import { ICompanyRepository } from '@core/company/domain/contracts/repository/company.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IDeleteCompanyInput,
  IDeleteCompanyOutput,
  IDeleteCompanyUseCase,
} from 'src/core/company/domain/contracts/use-cases/delete-company';

@Injectable()
export class DeleteCompanyUseCase implements IDeleteCompanyUseCase {
  constructor(private readonly companyRepository: ICompanyRepository) {}
  async execute(input: IDeleteCompanyInput): Promise<IDeleteCompanyOutput> {
    const company = await this.companyRepository.getOne({
      id: input.companyId,
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    await this.companyRepository.delete(input.companyId);

    return {
      companyId: input.companyId,
    };
  }
}
