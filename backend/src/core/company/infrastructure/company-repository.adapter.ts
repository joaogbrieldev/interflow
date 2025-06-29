import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepositoryPostgresAdapter } from 'src/libs/shared/src/infrastructure/db/postgres/base-repository.adapter';
import { getDataSourceName } from 'src/nest-modules/postgres-module/typeorm.config';
import { Repository } from 'typeorm';
import { CompanyAggregate } from '../domain/company.aggregate';
import { ICompanyRepository } from '../domain/contracts/repository/company.repository';
import { CompanyModel } from './company.model';
import { CompanyModelMapper } from './company.model-mapper';

@Injectable()
export class CompanyRepositoryAdapter
  extends BaseRepositoryPostgresAdapter<CompanyAggregate, CompanyModel>
  implements ICompanyRepository
{
  constructor(
    @InjectRepository(CompanyModel, getDataSourceName())
    private readonly _companyRepository: Repository<CompanyModel>,
  ) {
    super(_companyRepository, CompanyModel);
  }

  mapToDomain(normalizedPersistencyObject: CompanyModel): CompanyAggregate {
    return CompanyModelMapper.mapToDomain(normalizedPersistencyObject);
  }
  mapToModel(normalizedPersistencyObject: CompanyAggregate): CompanyModel {
    return CompanyModelMapper.mapToModel(normalizedPersistencyObject);
  }

  async updateCompany(
    companyId: string,
    company: CompanyAggregate,
  ): Promise<CompanyAggregate> {
    const companyModel = await this._companyRepository.findOne({
      where: { id: companyId },
    });

    if (!companyModel) {
      throw new Error('company not found');
    }

    companyModel.id = company.id;
    companyModel.name = company.name;
    companyModel.email = company.email ? company.email.getValue() : null;
    companyModel.phone = company.phone ? company.phone.getValue() : null;
    companyModel.contact = company.contact;
    companyModel.website = company.company_website;

    const updatedcompanyModel =
      await this._companyRepository.save(companyModel);

    return this.mapToDomain(updatedcompanyModel);
  }
}
