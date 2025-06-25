import { UserModelMapper } from '@core/user/infrastructure/user.model-mapper';
import { InterviewAggregate } from '../domain/interview.aggregate';
import { InterviewModel } from './interview.model';

export abstract class InterviewModelMapper {
  static toEntity(model: InterviewModel): InterviewAggregate {
    const user = UserModelMapper.toEntity(model.user);
    const interviewEntity: InterviewAggregate = new InterviewAggregate({
      id: model.id,
      initialScreen: model.initial_screen,
      status: model.status,
      scheduledDate: model.scheduled_date,
      feedback: model.feedback,
      user: user,
      type: model.type,
      interviewerName: model.interviewer_name,
      interviewLink: model.interview_link,
    });

    return interviewEntity;
  }
  static toModel(entity: InterviewAggregate): InterviewModel {
    const interviewModel: InterviewModel = new InterviewModel();
    interviewModel.id = entity.id;
    interviewModel.status = entity.status;
    interviewModel.scheduled_date = entity.scheduledDate;
    interviewModel.feedback = entity.feedback;
    return interviewModel;
  }
}
