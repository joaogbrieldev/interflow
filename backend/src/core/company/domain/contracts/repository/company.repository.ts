import { IRepositoryBase } from 'src/libs/shared/src/domain/contracts/infrastructure/repository-base';
import { CompanyAggregate } from '../../company.aggregate';

export abstract class ICompanyRepository extends IRepositoryBase<CompanyAggregate> {}
