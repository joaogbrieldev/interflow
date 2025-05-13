import { IGetCompanyByUserUseCase } from '@core/company/domain/contracts/use-cases/get-company-by-user';
import { CompanyRepositoryModule } from '@core/company/infrastructure/company.module';
import { Module, Provider } from '@nestjs/common';
import { GetCompaniesByUserUseCase } from './get-company-by-user.use-case';

export const GetCompaniesProvider: Provider = {
  useClass: GetCompaniesByUserUseCase,
  provide: IGetCompanyByUserUseCase,
};

@Module({
  imports: [CompanyRepositoryModule],
  exports: [GetCompaniesProvider],
  providers: [GetCompaniesProvider],
})
export class GetCompaniesDataModule {}
