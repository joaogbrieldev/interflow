import { ApplicationError } from './application.error';

export class AlreadyExistsError extends ApplicationError {
  constructor(paramName: string) {
    super(`Already exists: [${paramName}]`);
    this.name = AlreadyExistsError.name;
  }
}
