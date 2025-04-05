import { IGetUserOutput } from '@core/user/domain/contracts/use-cases/get-user';
import { Injectable } from '@nestjs/common';
import { IDataMapper } from 'src/libs/shared/src/domain/contracts/presentation/data-mapper';
import { GetUserOutputDto } from './dtos/get-user-output.dto';

@Injectable()
export class GetUserDataMapper
  implements IDataMapper<IGetUserOutput, GetUserOutputDto>
{
  mapOutputDto({ name, email }: IGetUserOutput): GetUserOutputDto {
    return new GetUserOutputDto(name, email);
  }
}
