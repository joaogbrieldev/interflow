import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  allModels,
  getDataSourceName,
} from 'src/nest-modules/postgres-module/typeorm.config';
import { ICompanyRepository } from '../domain/contracts/repository/company.repository';
import { CompanyRepositoryAdapter } from './company-repository.adapter';

const CompanyRepositoryProvider: Provider = {
  provide: ICompanyRepository,
  useClass: CompanyRepositoryAdapter,
};
@Module({
  imports: [TypeOrmModule.forFeature([...allModels], getDataSourceName())],
  providers: [CompanyRepositoryProvider],
  exports: [CompanyRepositoryProvider],
})
export class CompanyRepositoryModule {}
