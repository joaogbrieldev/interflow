import { InterviewStatus } from '@core/interview/domain/interview.aggregate';
import { validateSync } from 'class-validator';

export type CreateInterviewInputConstructorProps = {
  userId: string;
  initialScreen?: Date;
  status: InterviewStatus;
  technicalInterviewDate?: Date;
  interviewFeedback: string;
};

export class CreateInterviewInputDto {
  userId: string;
  initialScreen?: Date;
  status: InterviewStatus;
  technicalInterviewDate?: Date;
  interviewFeedback: string;

  constructor(props: CreateInterviewInputConstructorProps) {
    if (!props) return;
    this.userId = props.userId;
    this.initialScreen = props.initialScreen;
    this.status = props.status;
    this.status = props.status;
    this.technicalInterviewDate = props.technicalInterviewDate;
    this.interviewFeedback = props.interviewFeedback;
  }
}

export class ValidateCreateInterviewInput {
  static validate(input: CreateInterviewInputDto) {
    return validateSync(input);
  }
}
