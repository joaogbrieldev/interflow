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
}
