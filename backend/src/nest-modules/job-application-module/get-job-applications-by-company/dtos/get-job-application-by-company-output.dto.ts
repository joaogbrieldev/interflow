import { JobApplication } from '@core/job-application/domain/job-application.aggregate';
import { IPaginatedResult } from 'src/libs/shared/src/domain/contracts/infrastructure/repository-base';
import { PaginatedResultDto } from 'src/libs/shared/src/presentation/dtos/paginated-result.dto';

export class GetJobApplicationsByCompanyOutputDto extends PaginatedResultDto<JobApplication> {
  constructor(output: IPaginatedResult<JobApplication>) {
    super();
    this.docs = output.docs;
    this.totalDocs = output.totalDocs;
    this.totalPages = output.totalPages;
    this.currentPage = output.currentPage;
    this.limit = output.limit;
    this.nextPage = output.nextPage;
  }
}
