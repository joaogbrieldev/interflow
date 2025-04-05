import {
  IGetUserOutput,
  IGetUserUseCase,
} from '@core/user/domain/contracts/use-cases/get-user';
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
import { GetUserInputDto } from './dtos/get-user-input.dto';
import { GetUserOutputDto } from './dtos/get-user-output.dto';
import { GetUserDataMapper } from './get-user.mapper';

export type GetUserOutput =
  | GetUserOutputDto
  | InvalidParamError
  | MissingParamError
  | InternalServerError
  | AlreadyExistsError;

@Controller('user')
export class GetUserController
  implements IController<GetUserInputDto, GetUserOutputDto>
{
  constructor(
    private readonly _getUserUseCase: IGetUserUseCase,
    private readonly _getUserMapper: GetUserDataMapper,
  ) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.CONFLICT)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  async handle(
    @Query() { userId }: GetUserInputDto,
  ): Promise<IHttpResponse<GetUserOutput>> {
    try {
      const user: IGetUserOutput = await this._getUserUseCase.execute({
        userId,
      });
      const output: GetUserOutputDto = this._getUserMapper.mapOutputDto(user);

      return ok(output);
    } catch (error) {
      if (error instanceof ApplicationError) return badRequest(error);
      return internalServerError();
    }
  }
}
