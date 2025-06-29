import { Injectable } from '@nestjs/common';
import { IValidator } from 'src/libs/shared/src/domain/contracts/presentation/validator';
import { validateRequiredFieldsAndThrows } from 'src/libs/shared/src/presentation/helper/validator';
import { DeleteJobApplicationInputDto } from './dtos/delete-job-application-input.dto';

@Injectable()
export class DeleteJobApplicationValidator
  implements IValidator<DeleteJobApplicationInputDto>
{
  async validate(input: DeleteJobApplicationInputDto): Promise<void> {
    this._validateRequiredFields(input);
  }

  private _validateRequiredFields(input: DeleteJobApplicationInputDto): void {
    const requiredFields: string[] = ['jobApplicationId'];
    validateRequiredFieldsAndThrows<DeleteJobApplicationInputDto>(
      requiredFields,
      input,
    );
  }
}
