import { User } from '@core/user/domain/user.aggregate';
import { EntityBase } from 'src/libs/shared/src/data-layer/entities/entity-base';

export enum InterviewStatus {
  SENT = 'sent',
  TECHNICAL_TEST = 'technical_test',
  TECHNICAL_INTERVIEW = 'technical_interview',
  PROPOSAL = 'proposal',
  SCHEDULED = 'scheduled',
}

type InterviewConstructorProps = {
  id?: string;
  initialScreen?: Date;
  status: InterviewStatus;
  scheduledDate?: Date;
  feedback: string;
  interviewerName: string;
  user: User;
  interviewLink: string;
  type: string;
};

type InterviewCreateProps = {
  initialScreen?: Date;
  status: InterviewStatus;
  scheduledDate?: Date;
  feedback: string;
  interviewerName: string;
  user: User;
  interviewLink: string;
  type: string;
};

export class InterviewAggregate extends EntityBase {
  initialScreen?: Date;
  status: InterviewStatus;
  scheduledDate?: Date;
  feedback: string;
  type: string;
  interviewerName: string;
  interviewLink: string;

  user: User;

  constructor(props: InterviewConstructorProps) {
    super();
    Object.assign(this, props);
  }

  static create(props: InterviewCreateProps) {
    return new InterviewAggregate({
      initialScreen: props.initialScreen,
      status: props.status,
      scheduledDate: props.scheduledDate,
      feedback: props.feedback,
      interviewerName: props.interviewerName,
      interviewLink: props.interviewLink,
      user: props.user,
      type: props.type,
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

  definescheduledDate(scheduledDate: Date) {
    this.scheduledDate = scheduledDate;
    return this;
  }
  definefeedback(feedback: string) {
    this.feedback = feedback;
    return this;
  }
  defineInterviewName(interviewerName: string) {
    this.interviewerName = interviewerName;
    return this;
  }
  defineInterviewLink(link: string) {
    this.interviewLink = link;
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
      scheduledDate: this.scheduledDate,
      feedback: this.feedback,
    };
  }
}
