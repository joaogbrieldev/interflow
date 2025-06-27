import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';

export type IDeleteJobApplicationInput = {
  jobApplicationId: string;
};

export type IDeleteJobApplicationOutput = {
  jobApplicationId: string;
};

export abstract class IDeleteJobApplicationUseCase
  implements IUseCase<IDeleteJobApplicationInput, IDeleteJobApplicationOutput>
{
  abstract execute(
    input: IDeleteJobApplicationInput,
  ): Promise<IDeleteJobApplicationOutput>;
}
