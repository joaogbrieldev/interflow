import { InterviewAggregate } from '@core/interview/domain/interview.aggregate';
import { IPaginatedResult } from 'src/libs/shared/src/domain/contracts/infrastructure/repository-base';
import { PaginatedResultDto } from 'src/libs/shared/src/presentation/dtos/paginated-result.dto';

export class GetInterviewsOutputDto extends PaginatedResultDto<InterviewAggregate> {
  constructor(output: IPaginatedResult<InterviewAggregate>) {
    super();
    this.docs = output.docs;
    this.totalDocs = output.totalDocs;
    this.totalPages = output.totalPages;
    this.currentPage = output.currentPage;
    this.limit = output.limit;
    this.nextPage = output.nextPage;
  }
}
