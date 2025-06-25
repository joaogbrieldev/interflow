import { Injectable } from '@nestjs/common';
import { IValidator } from 'src/libs/shared/src/domain/contracts/presentation/validator';
import { validateRequiredFieldsAndThrows } from 'src/libs/shared/src/presentation/helper/validator';
import { CreateInterviewInputDto } from './dtos/create-interview-input.dto';

@Injectable()
export class CreateInterviewValidator
  implements IValidator<CreateInterviewInputDto>
{
  async validate(input: CreateInterviewInputDto): Promise<void> {
    this._validateRequiredFields(input);
  }

  private _validateRequiredFields(input: CreateInterviewInputDto): void {
    const requiredFields: string[] = [
      'userId',
      'initialScreen',
      'status',
      'technicalInterviewDate',
      'feedback',
    ];
    validateRequiredFieldsAndThrows<CreateInterviewInputDto>(
      requiredFields,
      input,
    );
  }
}
