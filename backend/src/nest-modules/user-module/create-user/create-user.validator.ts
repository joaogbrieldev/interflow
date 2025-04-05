import { Injectable } from '@nestjs/common';
import { IValidator } from 'src/libs/shared/src/domain/contracts/presentation/validator';
import { validateRequiredFieldsAndThrows } from 'src/libs/shared/src/presentation/helper/validator';
import { CreateUserInputDto } from './dtos/create-user-input.dto';

@Injectable()
export class CreateUserValidator implements IValidator<CreateUserInputDto> {
  async validate(input: CreateUserInputDto): Promise<void> {
    this._validateRequiredFields(input);
  }

  private _validateRequiredFields(input: CreateUserInputDto): void {
    const requiredFields: string[] = ['name', 'email', 'password'];
    validateRequiredFieldsAndThrows<CreateUserInputDto>(requiredFields, input);
  }
}
