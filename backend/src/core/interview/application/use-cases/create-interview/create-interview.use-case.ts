import { IInterviewRepository } from '@core/interview/domain/contracts/repository/interview.repository';
import {
  ICreateInterviewInput,
  ICreateInterviewOutput,
  ICreateInterviewUseCase,
} from '@core/interview/domain/contracts/use-cases/create-interview';
import { InterviewAggregate } from '@core/interview/domain/interview.aggregate';
import { IUserRepository } from '@core/user/domain/contracts/repository/user.repository';
import { Injectable } from '@nestjs/common';
import { FirebaseNotificationService } from '@shared/infrastructure/firebase-notification.service';

@Injectable()
export class CreateInterviewUseCase implements ICreateInterviewUseCase {
  constructor(
    private readonly InterviewRepository: IInterviewRepository,
    private readonly userRepository: IUserRepository,
    private readonly notificationService: FirebaseNotificationService,
  ) {}

  async execute({
    initialScreen,
    status,
    scheduledDate,
    feedback,
    interviewerName,
    interviewLink,
    userId,
    type,
  }: ICreateInterviewInput): Promise<ICreateInterviewOutput> {
    const user = await this.userRepository.getOne({
      id: userId,
    });
    const entity = InterviewAggregate.create({
      initialScreen,
      status,
      scheduledDate,
      feedback,
      interviewerName,
      interviewLink,
      user,
      type,
    });

    const interviewCreated: InterviewAggregate =
      await this.InterviewRepository.create(entity);

    // Envia notificação se o usuário tiver token FCM
    if (user.externalReference) {
      await this.notificationService.sendNotificationToTokens(
        [user.externalReference],
        {
          title: 'Nova Entrevista',
          body: `Uma nova entrevista foi agendada para você!`,
          data: {
            interviewId: interviewCreated.id,
          },
        },
      );
    }

    return {
      interviewId: interviewCreated.id,
    };
  }
}
