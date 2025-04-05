import { EntityBase } from 'src/libs/shared/src/data-layer/entities/entity-base';
import { Uuid } from 'src/libs/shared/src/domain/models/value-objects/uuid.vo';
import { UserFakerBuilder } from './user-fake.build';

export type UserConstructorProps = {
  user_id?: UserId;
  name: string;
  email: string;
};

export type UserCreateCommand = {
  name: string;
  email: string;
};

export class UserId extends Uuid {}

export class User extends EntityBase {
  user_id: UserId;
  name: string;
  email: string;
  password: string;

  constructor(props: UserConstructorProps) {
    super();
    this.user_id = props.user_id ?? new UserId();
    this.name = props.name;
    this.email = props.email;
  }
  static create(props: UserCreateCommand) {
    const user = new User(props);
    return user;
  }
  defineUsername(name: string): User {
    if (name) this.name = name.toLowerCase();
    return this;
  }
  defineHashedPassword(hashedPassword: string): User {
    this.password = hashedPassword;
    return this;
  }

  static fake() {
    return UserFakerBuilder;
  }

  get entity_id() {
    return this.user_id;
  }

  toJSON() {
    return {
      user_id: this.user_id.id,
      name: this.name,
      email: this.email,
    };
  }
}
