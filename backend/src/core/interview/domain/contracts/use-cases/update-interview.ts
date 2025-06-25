import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';
import { InterviewStatus } from '../../interview.aggregate';

export interface IUpdateInterviewInput {
  interviewId: string;
  initialScreen?: Date;
  status: InterviewStatus;
  scheduledDate?: Date;
  feedback: string;
  interviewerName: string;
  interviewLink: string;
}

export type IUpdateInterviewOutput = {
  initialScreen?: Date;
  status: InterviewStatus;
  scheduledDate?: Date;
  feedback: string;
  interviewerName: string;
  interviewLink: string;
};

export abstract class IUpdateInterviewUseCase
  implements IUseCase<IUpdateInterviewInput, IUpdateInterviewOutput>
{
  abstract execute(
    input: IUpdateInterviewInput,
  ): Promise<IUpdateInterviewOutput>;
}
