import { User } from '../domain/user.aggregate';
import { UserModel } from './user.model';

export abstract class UserModelMapper {
  static toEntity(model: UserModel): User {
    const userEntity: User = new User({
      id: model.id,
      name: model.name,
      email: model.email,
    });

    return userEntity;
  }
  static toModel(entity: User): UserModel {
    const userModel: UserModel = new UserModel();
    userModel.id = entity.id;
    userModel.name = entity.name;
    userModel.email = entity.email;
    return userModel;
  }
}
