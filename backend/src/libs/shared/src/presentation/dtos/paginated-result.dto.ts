import { IPaginatedResult } from '../../domain/contracts/infrastructure/repository-base';

export class PaginatedResultDto<T> implements IPaginatedResult<T> {
  currentPage: number;

  docs: T[];

  hasNext: boolean;

  limit: number;

  nextPage: number;

  totalDocs: number;

  totalPages: number;
}
