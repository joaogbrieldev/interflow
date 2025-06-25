import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';
import { InterviewStatus } from '../../interview.aggregate';

export type ICreateInterviewInput = {
  initialScreen?: Date;
  status: InterviewStatus;
  scheduledDate?: Date;
  feedback: string;
  interviewerName: string;
  userId: string;
  interviewLink: string;
  type: string;
};

export type ICreateInterviewOutput = {
  interviewId: string;
};

export abstract class ICreateInterviewUseCase
  implements IUseCase<ICreateInterviewInput, ICreateInterviewOutput>
{
  abstract execute(
    input: ICreateInterviewInput,
  ): Promise<ICreateInterviewOutput>;
}
