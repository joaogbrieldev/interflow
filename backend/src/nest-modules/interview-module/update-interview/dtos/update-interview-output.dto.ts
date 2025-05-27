import { JobApplication } from '@core/job-application/domain/job-application.aggregate';

export class UpdateJobApplicationOutputDto {
  jobApplication: JobApplication;

  constructor(jobApplication: JobApplication) {
    this.jobApplication = jobApplication;
  }
}
