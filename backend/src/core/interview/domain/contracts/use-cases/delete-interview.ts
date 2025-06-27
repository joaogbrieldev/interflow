import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';

export type IDeleteInterviewInput = {
  interviewId: string;
};

export type IDeleteInterviewOutput = {
  interviewId: string;
};

export abstract class IDeleteInterviewUseCase
  implements IUseCase<IDeleteInterviewInput, IDeleteInterviewOutput>
{
  abstract execute(
    input: IDeleteInterviewInput,
  ): Promise<IDeleteInterviewOutput>;
}
