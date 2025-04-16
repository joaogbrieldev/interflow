import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepositoryPostgresAdapter } from 'src/libs/shared/src/infrastructure/db/postgres/base-repository.adapter';
import { getDataSourceName } from 'src/nest-modules/postgres-module/typeorm.config';
import { Repository } from 'typeorm';
import { CompanyAggregate, CompanyId } from '../domain/company.aggregate';
import { ICompanyRepository } from '../domain/contracts/repository/company.repository';
import { CompanyModel } from './company.model';

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
    // const user = new User({
    //   name: normalizedPersistencyObject.user.name,
    //   email: normalizedPersistencyObject.user.email,
    // });
    const company: CompanyAggregate = new CompanyAggregate({
      company_id: new CompanyId(normalizedPersistencyObject.id),
      name: normalizedPersistencyObject.name,
      email: normalizedPersistencyObject.email,
      phone: normalizedPersistencyObject.phone,
      contact: normalizedPersistencyObject.contact.map((item) => ({
        name: item.name,
        position: item.position,
      })),
      company_website: normalizedPersistencyObject.website,
    });

    return company;
  }

  mapToModel(normalizedPersistencyObject: CompanyAggregate): CompanyModel {
    const company: CompanyModel = new CompanyModel();
    company.id = normalizedPersistencyObject.company_id.id;
    company.name = normalizedPersistencyObject.name;
    company.email = normalizedPersistencyObject.email.getValue();
    company.phone = normalizedPersistencyObject.phone.getValue();
    company.website = normalizedPersistencyObject.company_website;

    return company;
  }
}
