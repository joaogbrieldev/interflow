import { Injectable } from '@nestjs/common';
import { IValidator } from 'src/libs/shared/src/domain/contracts/presentation/validator';
import { validateRequiredFieldsAndThrows } from 'src/libs/shared/src/presentation/helper/validator';
import { CreateJobApplicationInputDto } from './dtos/create-job-application-input.dto';

@Injectable()
export class CreateJobApplicationValidator
  implements IValidator<CreateJobApplicationInputDto>
{
  async validate(input: CreateJobApplicationInputDto): Promise<void> {
    this._validateRequiredFields(input);
  }

  private _validateRequiredFields(input: CreateJobApplicationInputDto): void {
    const requiredFields: string[] = [
      'name',
      'link',
      'status',
      'status',
      'salary',
      'isEquity',
      'isInternational',
    ];
    validateRequiredFieldsAndThrows<CreateJobApplicationInputDto>(
      requiredFields,
      input,
    );
  }
}
