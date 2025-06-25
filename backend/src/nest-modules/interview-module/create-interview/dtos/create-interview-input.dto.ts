import { InterviewStatus } from '@core/interview/domain/interview.aggregate';
import { validateSync } from 'class-validator';

export type CreateInterviewInputConstructorProps = {
  userId: string;
  initialScreen?: Date;
  status: InterviewStatus;
  scheduledDate?: Date;
  feedback: string;
  interviewerName: string;
  interviewLink: string;
  type: string;
};

export class CreateInterviewInputDto {
  userId: string;
  initialScreen?: Date;
  status: InterviewStatus;
  scheduledDate?: Date;
  feedback: string;
  interviewerName: string;
  interviewLink: string;
  type: string;

  constructor(props: CreateInterviewInputConstructorProps) {
    if (!props) return;
    this.userId = props.userId;
    this.initialScreen = props.initialScreen;
    this.status = props.status;
    this.scheduledDate = props.scheduledDate;
    this.feedback = props.feedback;
    this.interviewerName = props.interviewerName;
    this.interviewLink = props.interviewLink;
    this.type = props.type;
  }
}

export class ValidateCreateInterviewInput {
  static validate(input: CreateInterviewInputDto) {
    return validateSync(input);
  }
}
