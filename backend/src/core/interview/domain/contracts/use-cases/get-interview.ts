import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';
import { IPaginatedResult } from 'src/libs/shared/src/domain/contracts/infrastructure/repository-base';
import { InterviewAggregate } from '../../interview.aggregate';

export type IGetInterviewsInput = {
  page: number;
  userId: string;
};

export abstract class IGetInterviewsUseCase
  implements IUseCase<IGetInterviewsInput, IPaginatedResult<InterviewAggregate>>
{
  abstract execute(
    input: IGetInterviewsInput,
  ): Promise<IPaginatedResult<InterviewAggregate>>;
}
