import { IGetCompanyByUserUseCase } from '@core/company/domain/contracts/use-cases/get-company-by-user';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
import { GetCompaniesOutputDto } from './dtos/get-companies-output.dto';

export type GetCompaniesOutput =
  | GetCompaniesOutputDto
  | InvalidParamError
  | MissingParamError
  | InternalServerError
  | AlreadyExistsError;

@Controller('companies')
export class GetCompaniesController
  implements IController<number, GetCompaniesOutputDto>
{
  constructor(
    private readonly _getCompaniesUseCase: IGetCompanyByUserUseCase,
  ) {}

  @Get('/:userId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.CONFLICT)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  async handle(
    @Query('page') page: number,
    @Query('userId') userId: string,
  ): Promise<IHttpResponse<GetCompaniesOutput>> {
    try {
      const companies: GetCompaniesOutput =
        await this._getCompaniesUseCase.execute({
          userId,
          page,
        });

      console.log(companies);
      return ok(companies);
    } catch (error) {
      if (error instanceof ApplicationError) return badRequest(error);
      return internalServerError();
    }
  }
}
