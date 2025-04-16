import { ICreateCompanyUseCase } from '@core/company/domain/contracts/use-cases/create-company';
import { CompanyRepositoryModule } from '@core/company/infrastructure/company.module';
import { Module, Provider } from '@nestjs/common';
import { CreateCompanyUseCase } from './create-company.use-case';

export const CreateCompanyProvider: Provider = {
  useClass: CreateCompanyUseCase,
  provide: ICreateCompanyUseCase,
};

@Module({
  imports: [CompanyRepositoryModule],
  exports: [CreateCompanyProvider],
  providers: [CreateCompanyProvider],
})
export class CreateCompanyDataModule {}
