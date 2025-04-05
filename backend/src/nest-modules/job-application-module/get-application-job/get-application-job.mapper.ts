import { IGetJobApplicationsOutput } from '@core/job-application/domain/contracts/use-cases/get-job-application';
import { Injectable } from '@nestjs/common';
import { IDataMapper } from 'src/libs/shared/src/domain/contracts/presentation/data-mapper';
import { GetJobApplicationsOutputDto } from './dtos/get-application-job-output.dto';

@Injectable()
export class GetJobApplicationDataMapper
  implements IDataMapper<IGetJobApplicationsOutput, GetJobApplicationsOutputDto>
{
  mapOutputDto(
    jobApplications: IGetJobApplicationsOutput,
  ): GetJobApplicationsOutputDto {
    return new GetJobApplicationsOutputDto(jobApplications);
  }
}
