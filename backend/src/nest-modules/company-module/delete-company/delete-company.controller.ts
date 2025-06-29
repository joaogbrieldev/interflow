import { IDeleteCompanyUseCase } from '@core/company/domain/contracts/use-cases/delete-company';
import {
  Controller,
  Delete,
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
import { DeleteCompanyOutputDto } from './dtos/delete-company-output.dto';

export type DeleteCompanyOutput =
  | DeleteCompanyOutputDto
  | InvalidParamError
  | MissingParamError
  | InternalServerError
  | AlreadyExistsError;

@Controller('companies')
export class DeleteCompanyController
  implements IController<number, DeleteCompanyOutputDto>
{
  constructor(private readonly _deleteCompanyUseCase: IDeleteCompanyUseCase) {}

  @Delete('/:companyId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.CONFLICT)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  async handle(
    @Query('page') page: number,
    @Query('companyId') companyId: string,
  ): Promise<IHttpResponse<DeleteCompanyOutput>> {
    try {
      const companies: DeleteCompanyOutput =
        await this._deleteCompanyUseCase.execute({
          companyId,
        });

      return ok(companies);
    } catch (error) {
      if (error instanceof ApplicationError) return badRequest(error);
      return internalServerError();
    }
  }
}
