import { EntityBase } from 'src/libs/shared/src/data-layer/entities/entity-base';
import { UserFakerBuilder } from './user-fake.build';

export type UserConstructorProps = {
  id?: string;
  name: string;
  email: string;
};

export type UserCreateCommand = {
  name: string;
  email: string;
};

export class User extends EntityBase {
  name: string;
  email: string;
  password: string;

  constructor(props: UserConstructorProps) {
    super();
    Object.assign(this, props);
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
    return this.id;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}
