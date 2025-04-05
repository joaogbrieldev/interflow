import { IAuthenticateOutput } from '@core/user/domain/contracts/use-cases/authenticate';
import { Injectable } from '@nestjs/common';
import { IDataMapper } from 'src/libs/shared/src/domain/contracts/presentation/data-mapper';
import { SigninOutputDto } from './dtos/signin-output.dto';

@Injectable()
export class SigninDataMapper
  implements IDataMapper<IAuthenticateOutput, SigninOutputDto>
{
  mapOutputDto(
    authenticatioObject: IAuthenticateOutput,
  ): Readonly<SigninOutputDto> {
    return new SigninOutputDto(
      authenticatioObject.token,
      authenticatioObject.refreshToken,
      authenticatioObject.user,
    );
  }
}
