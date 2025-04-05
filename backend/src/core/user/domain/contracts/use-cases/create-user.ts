import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';

export type ICreateUserInput = {
  name: string;
  email: string;
  password: string;
};

export type ICreateUserOutput = {
  userId: string;
};

export abstract class ICreateUserUseCase
  implements IUseCase<ICreateUserInput, ICreateUserOutput>
{
  abstract execute(input: ICreateUserInput): Promise<ICreateUserOutput>;
}
