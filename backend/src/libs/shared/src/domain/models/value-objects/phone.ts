import { ValueObject } from './value-object';

export enum PhoneAreaCodeEnum {
  BRAZIL = '55',
}

export class Phone extends ValueObject {
  private number: string;

  constructor(phoneNumber: string) {
    super();
    this.number = phoneNumber;
  }

  getValue() {
    return this.number;
  }
}
