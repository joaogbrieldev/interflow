import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';
import { JobApplication } from '../../job-application.aggregate';

export interface IUpdateJobApplicationsInput {
  jobApplicationsId: string;
  link?: string;
  status?: string;
  salary?: number;
  isEquity?: boolean;
  isInternational?: boolean;
}

export type IUpdateJobApplicationsOutput = JobApplication;

export abstract class IUpdateJobApplicationsUseCase
  implements IUseCase<IUpdateJobApplicationsInput, IUpdateJobApplicationsOutput>
{
  abstract execute(
    input: IUpdateJobApplicationsInput,
  ): Promise<IUpdateJobApplicationsOutput>;
}
