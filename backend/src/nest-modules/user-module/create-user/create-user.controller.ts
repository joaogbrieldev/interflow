import {
  ICreateUserOutput,
  ICreateUserUseCase,
} from '@core/user/domain/contracts/use-cases/create-user';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { IController } from 'src/libs/shared/src/domain/contracts/presentation/controller';
import { IHttpResponse } from 'src/libs/shared/src/domain/contracts/presentation/http';
import {
  AlreadyExistsError,
  ApplicationError,
  InternalServerError,
  InvalidParamError,
  MissingParamError,
  UnauthorizedError,
} from 'src/libs/shared/src/domain/errors/application';
import {
  badRequest,
  conflict,
  created,
  internalServerError,
} from 'src/libs/shared/src/presentation/helper/http';
import { CreateUserDataMapper } from './create-user.data-mapper';
import { CreateUserValidator } from './create-user.validator';
import { CreateUserInputDto } from './dtos/create-user-input.dto';
import { CreateUserOutputDto } from './dtos/create-user-output.dto';

export type CreateUserOutput =
  | CreateUserOutputDto
  | InvalidParamError
  | MissingParamError
  | InternalServerError
  | AlreadyExistsError
  | UnauthorizedError;

@Controller('user')
export class CreateUserController
  implements IController<CreateUserInputDto, CreateUserOutput>
{
  constructor(
    private readonly _createUserValidator: CreateUserValidator,
    private readonly _createUserUseCase: ICreateUserUseCase,
    private readonly _createUserMapper: CreateUserDataMapper,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.CONFLICT)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  async handle(
    @Body() input: CreateUserInputDto,
  ): Promise<IHttpResponse<CreateUserOutput>> {
    try {
      await this._createUserValidator.validate(input);
      const result: ICreateUserOutput = await this._createUserUseCase.execute({
        ...input,
      });
      const outputDto: CreateUserOutputDto =
        this._createUserMapper.mapOutputDto(result);
      return created(outputDto);
    } catch (error) {
      console.log(error);
      if (error instanceof AlreadyExistsError) return conflict(error);
      if (error instanceof ApplicationError) return badRequest(error);
      return internalServerError();
    }
  }
}
