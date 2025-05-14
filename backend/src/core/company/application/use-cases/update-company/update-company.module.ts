import { IUpdateCompanyUseCase } from '@core/company/domain/contracts/use-cases/update-company';
import { CompanyRepositoryModule } from '@core/company/infrastructure/company.module';
import { Module, Provider } from '@nestjs/common';
import { UpdateCompanyUseCase } from './update-company.use-case';

export const UpdateCompanyProvider: Provider = {
  useClass: UpdateCompanyUseCase,
  provide: IUpdateCompanyUseCase,
};

@Module({
  imports: [CompanyRepositoryModule],
  exports: [UpdateCompanyProvider],
  providers: [UpdateCompanyProvider],
})
export class UpdateCompanyDataModule {}
