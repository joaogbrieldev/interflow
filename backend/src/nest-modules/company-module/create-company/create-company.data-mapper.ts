import { ICreateCompanyOutput } from '@core/company/domain/contracts/use-cases/create-company';
import { Injectable } from '@nestjs/common';
import { IDataMapper } from 'src/libs/shared/src/domain/contracts/presentation/data-mapper';
import { CreateCompanyOutputDto } from './dtos/create-company-output.dto';

@Injectable()
export class CreateCompanyDataMapper
  implements IDataMapper<ICreateCompanyOutput, CreateCompanyOutputDto>
{
  mapOutputDto({ companyId }: ICreateCompanyOutput): CreateCompanyOutputDto {
    return new CreateCompanyOutputDto(companyId);
  }
}
