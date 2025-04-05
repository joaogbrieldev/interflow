import { ICreateJobApplicationOutput } from '@core/job-application/domain/contracts/use-cases/create-job-application';
import { Injectable } from '@nestjs/common';
import { IDataMapper } from 'src/libs/shared/src/domain/contracts/presentation/data-mapper';
import { CreateJobApplicationOutputDto } from './dtos/create-job-application-output.dto';

@Injectable()
export class CreateJobApplicationDataMapper
  implements
    IDataMapper<ICreateJobApplicationOutput, CreateJobApplicationOutputDto>
{
  mapOutputDto({
    jobApplicationId,
  }: ICreateJobApplicationOutput): CreateJobApplicationOutputDto {
    return new CreateJobApplicationOutputDto(jobApplicationId);
  }
}
