import { Injectable } from '@nestjs/common';
import { IValidator } from 'src/libs/shared/src/domain/contracts/presentation/validator';
import { validateRequiredFieldsAndThrows } from 'src/libs/shared/src/presentation/helper/validator';
import { DeleteInterviewInputDto } from './dtos/delete-interview-input.dto';

@Injectable()
export class DeleteInterviewValidator
  implements IValidator<DeleteInterviewInputDto>
{
  async validate(input: DeleteInterviewInputDto): Promise<void> {
    this._validateRequiredFields(input);
  }

  private _validateRequiredFields(input: DeleteInterviewInputDto): void {
    const requiredFields: string[] = ['interviewId'];
    validateRequiredFieldsAndThrows<DeleteInterviewInputDto>(
      requiredFields,
      input,
    );
  }
}
