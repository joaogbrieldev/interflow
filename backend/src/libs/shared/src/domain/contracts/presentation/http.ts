import { HttpStatus } from '@nestjs/common';

export type HttpResponsePayload<T> = object | T[] | null;

export interface IHttpResponse<T = any> {
  statusCode: HttpStatus;
  message?: string;
  data?: HttpResponsePayload<T>;
  error?: Error;
}
