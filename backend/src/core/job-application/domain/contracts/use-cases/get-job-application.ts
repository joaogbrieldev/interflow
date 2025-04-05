import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';
import { JobApplication } from '../../job-application.aggregate';

export type IGetJobApplicationsInput = {
  userId: string;
};

export type IGetJobApplicationsOutput = JobApplication[];

export abstract class IGetJobApplicationsUseCase
  implements IUseCase<IGetJobApplicationsInput, IGetJobApplicationsOutput>
{
  abstract execute(
    input: IGetJobApplicationsInput,
  ): Promise<IGetJobApplicationsOutput>;
}
