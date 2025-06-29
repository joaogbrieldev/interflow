import { IDeleteJobApplicationUseCase } from '@core/job-application/domain/contracts/use-cases/delete-job-application';
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
import { DeleteJobApplicationOutputDto } from './dtos/delete-job-application-output.dto';

export type DeleteJobApplicationOutput =
  | DeleteJobApplicationOutputDto
  | InvalidParamError
  | MissingParamError
  | InternalServerError
  | AlreadyExistsError;

@Controller('job-applications')
export class DeleteJobApplicationController
  implements IController<string, DeleteJobApplicationOutputDto>
{
  constructor(
    private readonly _deleteJobApplicationUseCase: IDeleteJobApplicationUseCase,
  ) {}

  @Delete('/:jobApplicationId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.CONFLICT)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  async handle(
    @Query('jobApplicationId') jobApplicationId: string,
  ): Promise<IHttpResponse<DeleteJobApplicationOutput>> {
    try {
      const companies: DeleteJobApplicationOutput =
        await this._deleteJobApplicationUseCase.execute({
          jobApplicationId,
        });

      return ok(companies);
    } catch (error) {
      if (error instanceof ApplicationError) return badRequest(error);
      return internalServerError();
    }
  }
}
