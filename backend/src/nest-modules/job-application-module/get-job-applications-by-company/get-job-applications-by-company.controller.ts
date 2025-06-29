import { IGetJobApplicationsByCompanyUseCase } from '@core/job-application/domain/contracts/use-cases/get-job-application-by-company';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
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
import { GetJobApplicationsByCompanyOutputDto } from './dtos/get-job-application-by-company-output.dto';

export type GetJobApplicationsByCompanyOutput =
  | GetJobApplicationsByCompanyOutputDto
  | InvalidParamError
  | MissingParamError
  | InternalServerError
  | AlreadyExistsError;

@Controller('job-applications-per-company')
export class GetJobApplicationsByCompanyController
  implements IController<number, GetJobApplicationsByCompanyOutputDto>
{
  constructor(
    private readonly _getJobApplicationUseCase: IGetJobApplicationsByCompanyUseCase,
  ) {}

  @Get('/:companyId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.CONFLICT)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  async handle(
    @Query('page') page: number,
    @Param('companyId') companyId: string,
  ): Promise<IHttpResponse<GetJobApplicationsByCompanyOutput>> {
    try {
      const jobApplications: GetJobApplicationsByCompanyOutput =
        await this._getJobApplicationUseCase.execute({
          companyId,
          page,
        });

      return ok(jobApplications);
    } catch (error) {
      if (error instanceof ApplicationError) return badRequest(error);
      return internalServerError();
    }
  }
}
