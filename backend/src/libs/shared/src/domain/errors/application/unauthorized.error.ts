import { ApplicationError } from './application.error';

export class UnauthorizedError extends ApplicationError {
  constructor(msg?: string, data?: any) {
    super('Unauthorized: ' + msg);
    this.name = UnauthorizedError.name;
    this.data = data;
  }
}
