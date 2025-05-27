import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';
import { InterviewStatus } from '../../interview.aggregate';

export type ICreateInterviewInput = {
  userId: string;
  initialScreen?: Date;
  status: InterviewStatus;
  technicalInterviewDate?: Date;
  interviewFeedback: string;
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
