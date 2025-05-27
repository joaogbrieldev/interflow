import { ICreateInterviewOutput } from '@core/interview/domain/contracts/use-cases/create-interview';
import { Injectable } from '@nestjs/common';
import { IDataMapper } from 'src/libs/shared/src/domain/contracts/presentation/data-mapper';
import { CreateInterviewOutputDto } from './dtos/create-interview-output.dto';

@Injectable()
export class CreateInterviewDataMapper
  implements IDataMapper<ICreateInterviewOutput, CreateInterviewOutputDto>
{
  mapOutputDto({
    interviewId,
  }: ICreateInterviewOutput): CreateInterviewOutputDto {
    return new CreateInterviewOutputDto(interviewId);
  }
}
