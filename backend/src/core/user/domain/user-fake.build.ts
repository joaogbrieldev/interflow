import {
  FakeBuilder,
  PropOrFactory,
} from '../../../libs/shared/testing/fake.bulder';
import { User } from './user.aggregate';

export class UserFakerBuilder<TBuild = any> extends FakeBuilder<TBuild> {
  private _email: PropOrFactory<string> = () => this._chance.email();

  private _name: PropOrFactory<string> = () => this._chance.name();

  private constructor(countObjs: number = 1) {
    super(countObjs);
  }

  static anUser(): UserFakerBuilder<User> {
    return new UserFakerBuilder<User>();
  }

  static theUsers(countObjs: number): UserFakerBuilder<User[]> {
    return new UserFakerBuilder<User[]>(countObjs);
  }

  withEmail(email: string): UserFakerBuilder<TBuild> {
    this._email = email;
    return this;
  }

  build(): TBuild {
    const objects: User[] = new Array(this._countObjs).fill(undefined).map(
      () =>
        new User({
          name: this._callFactory(this._name),
          email: this._callFactory(this._email),
        }),
    );

    return (this._countObjs === 1 ? objects[0] : objects) as TBuild;
  }
}
