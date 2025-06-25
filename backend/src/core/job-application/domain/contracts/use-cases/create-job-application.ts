import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';

export type ICreateJobApplicationInput = {
  name: string;
  link: string;
  status: string;
  salary: number;
  isEquity: boolean;
  isInternational: boolean;
  userId: string;
  position: string;
  companyId: string;
};

export type ICreateJobApplicationOutput = {
  jobApplicationId: string;
};

export abstract class ICreateJobApplicationUseCase
  implements IUseCase<ICreateJobApplicationInput, ICreateJobApplicationOutput>
{
  abstract execute(
    input: ICreateJobApplicationInput,
  ): Promise<ICreateJobApplicationOutput>;
}
