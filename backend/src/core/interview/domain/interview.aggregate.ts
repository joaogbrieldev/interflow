import { User } from '@core/user/domain/user.aggregate';
import { EntityBase } from 'src/libs/shared/src/data-layer/entities/entity-base';

export enum InterviewStatus {
  SENT = 'sent',
  TECHNICAL_TEST = 'technical_test',
  TECHNICAL_INTERVIEW = 'technical_interview',
  PROPOSAL = 'proposal',
}

type InterviewConstructorProps = {
  id?: string;
  initialScreen?: Date;
  status: InterviewStatus;
  technicalInterviewDate?: Date;
  interviewFeedback: string;
  user: User;
};

type InterviewCreateProps = {
  initialScreen?: Date;
  status: InterviewStatus;
  technicalInterviewDate?: Date;
  interviewFeedback: string;
  user: User;
};

export class InterviewAggregate extends EntityBase {
  initialScreen?: Date;
  status: InterviewStatus;
  technicalInterviewDate?: Date;
  interviewFeedback: string;
  user: User;

  constructor(props: InterviewConstructorProps) {
    super();
    Object.assign(this, props);
  }

  static create(props: InterviewCreateProps) {
    return new InterviewAggregate({
      initialScreen: props.initialScreen,
      status: props.status,
      technicalInterviewDate: props.technicalInterviewDate,
      interviewFeedback: props.interviewFeedback,
      user: props.user,
    });
  }

  defineInitialScreen(initialScreen: Date) {
    this.initialScreen = initialScreen;
    return this;
  }

  defineStatus(status: InterviewStatus) {
    this.status = status;
    return this;
  }

  defineTechnicalInterviewDate(technicalInterviewDate: Date) {
    this.technicalInterviewDate = technicalInterviewDate;
    return this;
  }
  defineInterviewFeedback(interviewFeedback: string) {
    this.interviewFeedback = interviewFeedback;
    return this;
  }
  get entity_id() {
    return this.id;
  }

  toJSON() {
    return {
      id: this.id,
      initialScreen: this.initialScreen,
      status: this.status,
      technicalInterviewDate: this.technicalInterviewDate,
      interviewFeedback: this.interviewFeedback,
    };
  }
}
