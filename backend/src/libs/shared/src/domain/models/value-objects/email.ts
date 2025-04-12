import { ValueObject } from './value-object';

export class Email extends ValueObject {
  private value: string;

  constructor(email: string) {
    super();
    if (!this.isValidEmail(email)) throw new Error('Invalid email');
    this.value = email;
  }

  isValidEmail(email: string) {
    return email.match(/^(.+)@(.+)$/);
  }

  getValue() {
    return this.value;
  }
}
