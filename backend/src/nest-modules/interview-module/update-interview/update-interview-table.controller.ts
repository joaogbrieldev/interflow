import {
  IUpdateJobApplicationsOutput,
  IUpdateJobApplicationsUseCase,
} from '@core/job-application/domain/contracts/use-cases/update-job-application';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { IController } from 'src/libs/shared/src/domain/contracts/presentation/controller';
import { IHttpResponse } from 'src/libs/shared/src/domain/contracts/presentation/http';
import {
  ApplicationError,
  InternalServerError,
  InvalidParamError,
  MissingParamError,
} from 'src/libs/shared/src/domain/errors/application';
import {
  badRequest,
  internalServerError,
  ok,
} from 'src/libs/shared/src/presentation/helper/http';
import { UpdateJobApplicationInputDto } from './dtos/update-interview-input.dto';

export type IUpdateJobApplicationOutputPresentation =
  | IUpdateJobApplicationsOutput
  | InvalidParamError
  | MissingParamError
  | InternalServerError;

@Controller('job-application')
export class UpdateJobApplicationController
  implements
    IController<
      UpdateJobApplicationInputDto,
      IUpdateJobApplicationOutputPresentation
    >
{
  constructor(
    private readonly _updateJobApplicationUseCase: IUpdateJobApplicationsUseCase,
  ) {}

  @Patch('/:jobapplicationid')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  async handle(
    @Body() body: UpdateJobApplicationInputDto,
    @Param('jobapplicationid') jobApplicationsId: string,
  ): Promise<IHttpResponse<IUpdateJobApplicationOutputPresentation>> {
    try {
      const result: IUpdateJobApplicationOutputPresentation =
        await this._updateJobApplicationUseCase.execute({
          ...body,
          jobApplicationsId,
        });

      return ok(result);
    } catch (error) {
      if (error instanceof ApplicationError) return badRequest(error);
      return internalServerError();
    }
  }
}
