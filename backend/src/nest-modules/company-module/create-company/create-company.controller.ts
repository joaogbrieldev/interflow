import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import {
  ICreateCompanyOutput,
  ICreateCompanyUseCase,
} from '@core/company/domain/contracts/use-cases/create-company';
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
import { CreateCompanyDataMapper } from './create-company.data-mapper';
import { CreateCompanyValidator } from './create-company.validator';
import { CreateCompanyInputDto } from './dtos/create-company-input.dto';
import { CreateCompanyOutputDto } from './dtos/create-company-output.dto';

export type CreateCompanyOutput =
  | CreateCompanyOutputDto
  | InvalidParamError
  | MissingParamError
  | InternalServerError
  | AlreadyExistsError
  | UnauthorizedError;

@Controller('company')
export class CreateCompanyController
  implements IController<CreateCompanyInputDto, CreateCompanyOutput>
{
  constructor(
    private readonly _createCompanyValidator: CreateCompanyValidator,
    private readonly _createCompanyUseCase: ICreateCompanyUseCase,
    private readonly _createCompanyMapper: CreateCompanyDataMapper,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.CONFLICT)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  async handle(
    @Body() input: CreateCompanyInputDto,
  ): Promise<IHttpResponse<CreateCompanyOutput>> {
    try {
      await this._createCompanyValidator.validate(input);
      const result: ICreateCompanyOutput =
        await this._createCompanyUseCase.execute({
          ...input,
        });
      const outputDto: CreateCompanyOutputDto =
        this._createCompanyMapper.mapOutputDto(result);
      return created(outputDto);
    } catch (error) {
      console.log(error);
      if (error instanceof AlreadyExistsError) return conflict(error);
      if (error instanceof ApplicationError) return badRequest(error);
      return internalServerError();
    }
  }
}
