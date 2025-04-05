import { ApplicationError } from './application.error';

export class ConflictError extends ApplicationError {
  constructor(msg: string) {
    super(msg || 'Conflict');
    this.name = ConflictError.name;
  }
}
