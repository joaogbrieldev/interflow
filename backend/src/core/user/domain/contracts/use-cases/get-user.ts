import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';

export type IGetUserInput = {
  userId: string;
};

export type IGetUserOutput = {
  name: string;
  email: string;
};

export abstract class IGetUserUseCase
  implements IUseCase<IGetUserInput, IGetUserOutput>
{
  abstract execute(input: IGetUserInput): Promise<IGetUserOutput>;
}
