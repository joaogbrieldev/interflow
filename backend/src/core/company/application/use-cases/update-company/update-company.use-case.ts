import { CompanyAggregate } from '@core/company/domain/company.aggregate';
import { ICompanyRepository } from '@core/company/domain/contracts/repository/company.repository';
import {
  IUpdateCompanyInput,
  IUpdateCompanyUseCase,
} from '@core/company/domain/contracts/use-cases/update-company';
import { Injectable } from '@nestjs/common';
import { throwsException } from 'src/libs/shared/src/data-layer/helper/exception';

import { InvalidParamError } from 'src/libs/shared/src/domain/errors/application';

@Injectable()
export class UpdateCompanyUseCase implements IUpdateCompanyUseCase {
  constructor(private readonly _companyRepository: ICompanyRepository) {}

  async execute(input: IUpdateCompanyInput): Promise<CompanyAggregate> {
    const { companyId, name, email, phone, contact, company_website } = input;
    await this._validateCompanyId(companyId);
    const company: CompanyAggregate = await this._companyRepository.get(
      companyId,
      null,
      ['user'],
    );

    if (name !== undefined) company.defineName(name);
    if (phone !== undefined) company.definePhone(phone);
    if (company_website !== undefined) company.defineWebsite(company_website);
    if (contact?.name && contact?.role) {
      company.defineContact(contact.name, contact.role);
    }
    if (email !== undefined) {
      company.defineEmail(email);
    }

    await this._companyRepository.updateCompany(companyId, company);

    return company;
  }

  private async _validateCompanyId(companyId: string): Promise<void> {
    const hasCompany: boolean = await this._companyRepository.exists({
      id: companyId,
    });
    if (!hasCompany) throwsException(new InvalidParamError('companyId'));
  }
}
