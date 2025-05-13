import {
  IGetCompaniesByUserOutput,
  IGetCompanyByUserUseCase,
} from '@core/company/domain/contracts/use-cases/get-company-by-user';
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
import { GetCompaniesOutputDto } from './dtos/get-companies-output.dto';
import { GetCompaniesDataMapper } from './get-companies.mapper';

export type GetCompaniesOutput =
  | GetCompaniesOutputDto
  | InvalidParamError
  | MissingParamError
  | InternalServerError
  | AlreadyExistsError;

@Controller('job-applications')
export class GetCompaniesController
  implements IController<string, GetCompaniesOutputDto>
{
  constructor(
    private readonly _getCompaniesUseCase: IGetCompanyByUserUseCase,
    private readonly _getCompaniesMapper: GetCompaniesDataMapper,
  ) {}

  @Get('/:userId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.CONFLICT)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  async handle(
    @Param('userId') userId: string,
  ): Promise<IHttpResponse<GetCompaniesOutput>> {
    try {
      const companies: IGetCompaniesByUserOutput =
        await this._getCompaniesUseCase.execute({
          userId,
        });
      const output: GetCompaniesOutputDto =
        this._getCompaniesMapper.mapOutputDto(companies);

      return ok(output);
    } catch (error) {
      if (error instanceof ApplicationError) return badRequest(error);
      return internalServerError();
    }
  }
}
