import { IGetInterviewsUseCase } from '@core/interview/domain/contracts/use-cases/get-interview';
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
import { GetInterviewsOutputDto } from './dtos/get-interview-output.dto';

type Page = number;

export type GetInterviewOutput =
  | GetInterviewsOutputDto
  | InvalidParamError
  | MissingParamError
  | InternalServerError
  | AlreadyExistsError;

@Controller('interviews')
export class GetInterviewController
  implements IController<Page, GetInterviewsOutputDto>
{
  constructor(private readonly _getInterviewUseCase: IGetInterviewsUseCase) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.CONFLICT)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  async handle(
    @Query('page') page: number,
    @Query('userId') userId: string,
  ): Promise<IHttpResponse<GetInterviewOutput>> {
    try {
      const interview: GetInterviewOutput =
        await this._getInterviewUseCase.execute({
          userId,
          page,
        });
      return ok(interview);
    } catch (error) {
      if (error instanceof ApplicationError) return badRequest(error);
      return internalServerError();
    }
  }
}
