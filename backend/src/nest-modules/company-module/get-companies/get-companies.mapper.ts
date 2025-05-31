import { IGetCompaniesByUserOutput } from '@core/company/domain/contracts/use-cases/get-company-by-user';
import { Injectable } from '@nestjs/common';
import { IDataMapper } from 'src/libs/shared/src/domain/contracts/presentation/data-mapper';
import { GetCompaniesOutputDto } from './dtos/get-companies-output.dto';

@Injectable()
export class GetCompaniesDataMapper
  implements IDataMapper<IGetCompaniesByUserOutput, GetCompaniesOutputDto>
{
  mapOutputDto(companies: IGetCompaniesByUserOutput): GetCompaniesOutputDto {
    return new GetCompaniesOutputDto(companies);
  }
}
