import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import {
  ICreateJobApplicationOutput,
  ICreateJobApplicationUseCase,
} from '@core/job-application/domain/contracts/use-cases/create-job-application';
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
import { CreateJobApplicationDataMapper } from './create-job-application.data-mapper';
import { CreateJobApplicationValidator } from './create-job-application.validator';
import { CreateJobApplicationInputDto } from './dtos/create-job-application-input.dto';
import { CreateJobApplicationOutputDto } from './dtos/create-job-application-output.dto';

export type CreateJobApplicationOutput =
  | CreateJobApplicationOutputDto
  | InvalidParamError
  | MissingParamError
  | InternalServerError
  | AlreadyExistsError
  | UnauthorizedError;

@Controller('job-application')
export class CreateJobApplicationController
  implements
    IController<CreateJobApplicationInputDto, CreateJobApplicationOutput>
{
  constructor(
    private readonly _createJobApplicationValidator: CreateJobApplicationValidator,
    private readonly _createJobApplicationUseCase: ICreateJobApplicationUseCase,
    private readonly _createJobApplicationMapper: CreateJobApplicationDataMapper,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.CONFLICT)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  async handle(
    @Body() input: CreateJobApplicationInputDto,
  ): Promise<IHttpResponse<CreateJobApplicationOutput>> {
    try {
      await this._createJobApplicationValidator.validate(input);
      const result: ICreateJobApplicationOutput =
        await this._createJobApplicationUseCase.execute({
          ...input,
        });
      const outputDto: CreateJobApplicationOutputDto =
        this._createJobApplicationMapper.mapOutputDto(result);
      return created(outputDto);
    } catch (error) {
      console.log(error);
      if (error instanceof AlreadyExistsError) return conflict(error);
      if (error instanceof ApplicationError) return badRequest(error);
      return internalServerError();
    }
  }
}
