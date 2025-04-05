export class InternalServerError extends Error {
  name: string;
  message: string;

  constructor() {
    super('Internal server error');
    this.name = InternalServerError.name;
  }
}
