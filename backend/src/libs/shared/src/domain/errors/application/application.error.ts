export class ApplicationError extends Error {
  name: string;
  message: any;
  data: object | [];
}
