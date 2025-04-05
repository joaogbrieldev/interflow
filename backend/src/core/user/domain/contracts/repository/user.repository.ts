import { IRepositoryBase } from '../../../../../libs/shared/src/domain/contracts/infrastructure/repository-base';
import { User } from '../../user.aggregate';

export abstract class IUserRepository extends IRepositoryBase<User> {
  abstract addUserAccountCreated({ name, email, password }): Promise<User>;
  abstract getUserByEmail(email: string);
}
