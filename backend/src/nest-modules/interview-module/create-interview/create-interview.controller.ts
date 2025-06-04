import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import {
  ICreateInterviewOutput,
  ICreateInterviewUseCase,
} from '@core/interview/domain/contracts/use-cases/create-interview';
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
import { CreateInterviewDataMapper } from './create-interview.data-mapper';
import { CreateInterviewValidator } from './create-interview.validator';
import { CreateInterviewInputDto } from './dtos/create-interview-input.dto';
import { CreateInterviewOutputDto } from './dtos/create-interview-output.dto';

export type CreateInterviewOutput =
  | CreateInterviewOutputDto
  | InvalidParamError
  | MissingParamError
  | InternalServerError
  | AlreadyExistsError
  | UnauthorizedError;

@Controller('interviews')
export class CreateInterviewController
  implements IController<CreateInterviewInputDto, CreateInterviewOutput>
{
  constructor(
    private readonly _createInterviewValidator: CreateInterviewValidator,
    private readonly _createInterviewUseCase: ICreateInterviewUseCase,
    private readonly _createInterviewMapper: CreateInterviewDataMapper,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.CONFLICT)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  async handle(
    @Body() input: CreateInterviewInputDto,
  ): Promise<IHttpResponse<CreateInterviewOutput>> {
    try {
      await this._createInterviewValidator.validate(input);
      const result: ICreateInterviewOutput =
        await this._createInterviewUseCase.execute({
          ...input,
        });
      const outputDto: CreateInterviewOutputDto =
        this._createInterviewMapper.mapOutputDto(result);
      return created(outputDto);
    } catch (error) {
      console.log(error);
      if (error instanceof AlreadyExistsError) return conflict(error);
      if (error instanceof ApplicationError) return badRequest(error);
      return internalServerError();
    }
  }
}
