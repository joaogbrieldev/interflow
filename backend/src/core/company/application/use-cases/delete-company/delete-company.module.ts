import { IDeleteCompanyUseCase } from '@core/company/domain/contracts/use-cases/delete-company';
import { CompanyRepositoryModule } from '@core/company/infrastructure/company.module';
import { Module, Provider } from '@nestjs/common';
import { DeleteCompanyUseCase } from './delete-company.use-case';

export const DeleteCompanyProvider: Provider = {
  useClass: DeleteCompanyUseCase,
  provide: IDeleteCompanyUseCase,
};

@Module({
  imports: [CompanyRepositoryModule],
  exports: [DeleteCompanyProvider],
  providers: [DeleteCompanyProvider],
})
export class DeleteCompanyDataModule {}
