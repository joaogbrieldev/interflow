import { HttpStatus } from '@nestjs/common';
import {
  HttpResponsePayload,
  IHttpResponse,
} from '../../domain/contracts/presentation/http';
import { InternalServerError } from '../../domain/errors/application';

export const created = <T = any>(
  data: HttpResponsePayload<T>,
  msg?: string,
): IHttpResponse<T> => {
  return {
    statusCode: HttpStatus.CREATED,
    data,
    message: msg,
  };
};

export const ok = <T = any>(
  data: HttpResponsePayload<T>,
  msg?: string,
): IHttpResponse<T> => {
  return {
    statusCode: HttpStatus.OK,
    data,
    message: msg,
  };
};

export const conflict = (error: Error): IHttpResponse<Error> => {
  return {
    statusCode: HttpStatus.CONFLICT,
    message: 'Conflito 🧐',
    error: error,
  };
};

export const badRequest = (error: Error): IHttpResponse<Error> => {
  return {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Falhou 🤔',
    error: error,
  };
};

export const internalServerError = (): IHttpResponse<Error> => {
  return {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Ops... Algo deu errado 🤕',
    error: new InternalServerError(),
  };
};

export const noContent = (): IHttpResponse<HttpStatus> => {
  return {
    statusCode: HttpStatus.NO_CONTENT,
  };
};

export const unauthorized = (error: Error): IHttpResponse<Error> => {
  return {
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Acesso negado 🤭',
    error: error,
  };
};
