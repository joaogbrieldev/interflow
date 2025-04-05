import { IUseCase } from 'src/libs/shared/src/domain/contracts/application/use-case';
import { User } from '../../user.aggregate';

export interface IAuthenticateInput {
  email: string;
  password: string;
}

export interface IAuthenticateOutput {
  token: string;
  refreshToken: string;
  user: User;
}

export abstract class IAuthenticate
  implements IUseCase<IAuthenticateInput, IAuthenticateOutput>
{
  abstract execute(input: IAuthenticateInput): Promise<IAuthenticateOutput>;
}
