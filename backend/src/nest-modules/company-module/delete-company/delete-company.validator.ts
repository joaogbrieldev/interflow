import { Injectable } from '@nestjs/common';
import { IValidator } from 'src/libs/shared/src/domain/contracts/presentation/validator';
import { validateRequiredFieldsAndThrows } from 'src/libs/shared/src/presentation/helper/validator';
import { DeleteCompanyInputDto } from './dtos/delete-company-input.dto';

@Injectable()
export class DeleteCompanyValidator
  implements IValidator<DeleteCompanyInputDto>
{
  async validate(input: DeleteCompanyInputDto): Promise<void> {
    this._validateRequiredFields(input);
  }

  private _validateRequiredFields(input: DeleteCompanyInputDto): void {
    const requiredFields: string[] = ['companyId'];
    validateRequiredFieldsAndThrows<DeleteCompanyInputDto>(
      requiredFields,
      input,
    );
  }
}
