import { throwsException } from '../../data-layer/helper/exception';
import { MissingParamError } from '../../domain/errors/application/missing-param.error';

export const validateRequiredFieldsAndThrows = <T>(
  requiredFields: string[],
  params: T,
): void => {
  for (const requiredField of requiredFields) {
    const keys: string[] = requiredField.split('.');
    const hasValue: string = keys.reduce(
      (obj: T, path: string) => obj[path],
      params,
    );
    if ([null, undefined, String()].includes(hasValue)) {
      throwsException(new MissingParamError(requiredField));
    }
  }
};
