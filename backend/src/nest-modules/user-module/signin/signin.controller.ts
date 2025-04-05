import {
  IAuthenticate,
  IAuthenticateOutput,
} from '@core/user/domain/contracts/use-cases/authenticate';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { IController } from 'src/libs/shared/src/domain/contracts/presentation/controller';
import { IHttpResponse } from 'src/libs/shared/src/domain/contracts/presentation/http';
import {
  ApplicationError,
  InternalServerError,
  InvalidParamError,
  MissingParamError,
  UnauthorizedError,
} from 'src/libs/shared/src/domain/errors/application';
import {
  badRequest,
  internalServerError,
  ok,
  unauthorized,
} from 'src/libs/shared/src/presentation/helper/http';
import { SigninInputDto } from './dtos/signin-input.dto';
import { SigninOutputDto } from './dtos/signin-output.dto';
import { SigninDataMapper } from './signin.data-mapper';
import { SigninValidator } from './signin.validator';

export type SigninOutput =
  | SigninOutputDto
  | InvalidParamError
  | MissingParamError
  | InternalServerError
  | UnauthorizedError;

@Controller('sign-in')
export class SigninController
  implements IController<SigninInputDto, SigninOutput>
{
  constructor(
    private readonly signinValidator: SigninValidator,
    private readonly authenticateUseCase: IAuthenticate,
    private readonly signinDataMapper: SigninDataMapper,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  async handle(
    @Body() input: SigninInputDto,
  ): Promise<IHttpResponse<SigninOutput>> {
    try {
      await this.signinValidator.validate(input);
      const authenticationObject: IAuthenticateOutput =
        await this.authenticateUseCase.execute({
          email: input.email.toLowerCase(),
          password: input.password,
        });
      const outputDto: Readonly<SigninOutputDto> =
        this.signinDataMapper.mapOutputDto(authenticationObject);
      return ok(outputDto);
    } catch (error) {
      if (error instanceof UnauthorizedError) return unauthorized(error);
      if (error instanceof ApplicationError) return badRequest(error);
      return internalServerError();
    }
  }
}
