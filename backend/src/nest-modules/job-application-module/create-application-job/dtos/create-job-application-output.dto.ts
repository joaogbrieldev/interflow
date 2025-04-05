export class CreateJobApplicationOutputDto {
  jobApplicationId: string;

  constructor(jobApplicationId: string) {
    this.jobApplicationId = jobApplicationId;
  }
}
