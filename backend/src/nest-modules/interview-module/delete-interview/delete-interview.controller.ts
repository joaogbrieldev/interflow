import { IDeleteInterviewUseCase } from '@core/interview/domain/contracts/use-cases/delete-interview';
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
import { DeleteInterviewOutputDto } from './dtos/delete-interview-output.dto';

export type DeleteInterviewOutput =
  | DeleteInterviewOutputDto
  | InvalidParamError
  | MissingParamError
  | InternalServerError
  | AlreadyExistsError;

@Controller('interviews')
export class DeleteInterviewController
  implements IController<number, DeleteInterviewOutputDto>
{
  constructor(
    private readonly _deleteInterviewUseCase: IDeleteInterviewUseCase,
  ) {}

  @Delete('/:interviewId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.CONFLICT)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  async handle(
    @Query('page') page: number,
    @Query('interviewId') interviewId: string,
  ): Promise<IHttpResponse<DeleteInterviewOutput>> {
    try {
      const companies: DeleteInterviewOutput =
        await this._deleteInterviewUseCase.execute({
          interviewId,
        });

      return ok(companies);
    } catch (error) {
      if (error instanceof ApplicationError) return badRequest(error);
      return internalServerError();
    }
  }
}
