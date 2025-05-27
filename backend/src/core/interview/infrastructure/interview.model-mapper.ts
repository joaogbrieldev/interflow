import { UserModelMapper } from '@core/user/infrastructure/user.model-mapper';
import { InterviewAggregate } from '../domain/interview.aggregate';
import { InterviewModel } from './interview.model';

export abstract class InterviewModelMapper {
  static toEntity(model: InterviewModel): InterviewAggregate {
    const user = UserModelMapper.toEntity(model.user);
    const interviewEntity: InterviewAggregate = new InterviewAggregate({
      initialScreen: model.initialScreen,
      status: model.status,
      technicalInterviewDate: model.technicalInterviewDate,
      interviewFeedback: model.interviewFeedback,
      user: user,
    });

    return interviewEntity;
  }
  static toModel(entity: InterviewAggregate): InterviewModel {
    const interviewModel: InterviewModel = new InterviewModel();
    interviewModel.initialScreen = entity.initialScreen;
    interviewModel.status = entity.status;
    interviewModel.technicalInterviewDate = entity.technicalInterviewDate;
    interviewModel.interviewFeedback = entity.interviewFeedback;
    return interviewModel;
  }
}
