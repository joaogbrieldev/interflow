import { Injectable } from '@nestjs/common';
import { IValidator } from 'src/libs/shared/src/domain/contracts/presentation/validator';
import { validateRequiredFieldsAndThrows } from 'src/libs/shared/src/presentation/helper/validator';
import { CreateCompanyInputDto } from './dtos/create-company-input.dto';

@Injectable()
export class CreateCompanyValidator
  implements IValidator<CreateCompanyInputDto>
{
  async validate(input: CreateCompanyInputDto): Promise<void> {
    this._validateRequiredFields(input);
  }

  private _validateRequiredFields(input: CreateCompanyInputDto): void {
    const requiredFields: string[] = [
      'email',
      'name',
      'phone',
      'contact',
      'company_website',
    ];
    validateRequiredFieldsAndThrows<CreateCompanyInputDto>(
      requiredFields,
      input,
    );
  }
}
