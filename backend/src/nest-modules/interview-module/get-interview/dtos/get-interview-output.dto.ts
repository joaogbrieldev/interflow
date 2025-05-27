import { JobApplication } from '@core/job-application/domain/job-application.aggregate';

export class GetJobApplicationsOutputDto {
  applicationJobs: JobApplication[];
  constructor(applicationJobs: JobApplication[]) {
    this.applicationJobs = applicationJobs;
  }
}
