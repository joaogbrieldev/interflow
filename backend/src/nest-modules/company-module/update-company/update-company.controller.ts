import {
  IUpdateCompanyOutput,
  IUpdateCompanyUseCase,
} from '@core/company/domain/contracts/use-cases/update-company';
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
import { UpdateCompanyInputDto } from './dtos/update-company-input.dto';

export type IUpdateCompanyOutputPresentation =
  | IUpdateCompanyOutput
  | InvalidParamError
  | MissingParamError
  | InternalServerError;

@Controller('company')
export class UpdateCompanyController
  implements
    IController<UpdateCompanyInputDto, IUpdateCompanyOutputPresentation>
{
  constructor(private readonly _updateCompanyUseCase: IUpdateCompanyUseCase) {}

  @Patch('/:companyid')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  async handle(
    @Body() body: UpdateCompanyInputDto,
    @Param('companyid') companyId: string,
  ): Promise<IHttpResponse<IUpdateCompanyOutputPresentation>> {
    try {
      const result: IUpdateCompanyOutputPresentation =
        await this._updateCompanyUseCase.execute({
          ...body,
          companyId,
        });

      return ok(result);
    } catch (error) {
      if (error instanceof ApplicationError) return badRequest(error);
      return internalServerError();
    }
  }
}
