import { ApplicationError } from './application.error';

export class NotFoundError extends ApplicationError {
  constructor(message?: string) {
    super(message ?? `Resource not found!`);
    this.name = NotFoundError.name;
  }
}
