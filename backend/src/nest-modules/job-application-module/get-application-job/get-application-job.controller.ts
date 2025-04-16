import {
  IGetJobApplicationsOutput,
  IGetJobApplicationsUseCase,
} from '@core/job-application/domain/contracts/use-cases/get-job-application';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/libs/shared/src/data-layer/jwt-service/jwt-adapter.service';
import { IController } from 'src/libs/shared/src/domain/contracts/presentation/controller';
import { IHttpResponse } from 'src/libs/shared/src/domain/contracts/presentation/http';
import {
  AlreadyExistsError,
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
import { GetJobApplicationsOutputDto } from './dtos/get-application-job-output.dto';
import { GetJobApplicationDataMapper } from './get-application-job.mapper';

export type GetJobApplicationOutput =
  | GetJobApplicationsOutputDto
  | InvalidParamError
  | MissingParamError
  | InternalServerError
  | AlreadyExistsError;

@Controller('job-applications')
export class GetJobApplicationController
  implements IController<string, GetJobApplicationsOutputDto>
{
  constructor(
    private readonly _getJobApplicationUseCase: IGetJobApplicationsUseCase,
    private readonly _getJobApplicationMapper: GetJobApplicationDataMapper,
  ) {}

  @Get('/:userId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.CONFLICT)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  async handle(
    @Param('userId') userId: string,
  ): Promise<IHttpResponse<GetJobApplicationOutput>> {
    try {
      const JobApplication: IGetJobApplicationsOutput =
        await this._getJobApplicationUseCase.execute({
          userId,
        });
      const output: GetJobApplicationsOutputDto =
        this._getJobApplicationMapper.mapOutputDto(JobApplication);

      return ok(output);
    } catch (error) {
      if (error instanceof ApplicationError) return badRequest(error);
      return internalServerError();
    }
  }
}
