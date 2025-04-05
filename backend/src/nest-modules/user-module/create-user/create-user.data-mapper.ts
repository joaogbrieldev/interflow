import { ICreateUserOutput } from '@core/user/domain/contracts/use-cases/create-user';
import { Injectable } from '@nestjs/common';
import { IDataMapper } from 'src/libs/shared/src/domain/contracts/presentation/data-mapper';
import { CreateUserOutputDto } from './dtos/create-user-output.dto';

@Injectable()
export class CreateUserDataMapper
  implements IDataMapper<ICreateUserOutput, CreateUserOutputDto>
{
  mapOutputDto({ userId }: ICreateUserOutput): CreateUserOutputDto {
    return new CreateUserOutputDto(userId);
  }
}
