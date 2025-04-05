import { IHttpResponse } from './http';

export abstract class IController<InputDto, OutputDto> {
  abstract handle(
    input: InputDto,
    ...optionalParams: unknown[]
  ): Promise<IHttpResponse<OutputDto | Error>>;
}
