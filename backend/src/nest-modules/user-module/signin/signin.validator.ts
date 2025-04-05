import { Injectable } from '@nestjs/common';
import { throwsException } from 'src/libs/shared/src/data-layer/helper/exception';
import { IValidator } from 'src/libs/shared/src/domain/contracts/presentation/validator';
import { MissingParamError } from 'src/libs/shared/src/domain/errors/application';
import { validateRequiredFieldsAndThrows } from 'src/libs/shared/src/presentation/helper/validator';
import { SigninInputDto } from './dtos/signin-input.dto';

export const isNullOrEmpty = (data: any): boolean => {
  return data === undefined || data === null;
};

@Injectable()
export class SigninValidator implements IValidator<SigninInputDto> {
  constructor() {}
  async validate(input: SigninInputDto): Promise<void> {
    if (isNullOrEmpty(input))
      throwsException(new MissingParamError('email, password'));
    const requiredFields: string[] = ['email', 'password'];
    validateRequiredFieldsAndThrows(requiredFields, input);
  }
}
