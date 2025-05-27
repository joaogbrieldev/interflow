import { IInterviewRepository } from '@core/interview/domain/contracts/repository/interview.repository';
import {
  IUpdateInterviewInput,
  IUpdateInterviewUseCase,
} from '@core/interview/domain/contracts/use-cases/update-interview';
import { InterviewAggregate } from '@core/interview/domain/interview.aggregate';
import { Injectable } from '@nestjs/common';
import { throwsException } from 'src/libs/shared/src/data-layer/helper/exception';

import { InvalidParamError } from 'src/libs/shared/src/domain/errors/application';

@Injectable()
export class UpdateInterviewUseCase implements IUpdateInterviewUseCase {
  constructor(private readonly _interviewRepository: IInterviewRepository) {}

  async execute(input: IUpdateInterviewInput): Promise<InterviewAggregate> {
    const {
      interviewId,
      initialScreen,
      status,
      technicalInterviewDate,
      interviewFeedback,
    } = input;
    await this._validateInterviewId(interviewId);
    const interview: InterviewAggregate = await this._interviewRepository.get(
      interviewId,
      null,
      ['user'],
    );

    interview
      .defineInitialScreen(initialScreen)
      .defineStatus(status)
      .defineTechnicalInterviewDate(technicalInterviewDate)
      .defineInterviewFeedback(interviewFeedback);

    await this._interviewRepository.update(interviewId, interview);

    return interview;
  }

  private async _validateInterviewId(InterviewId: string): Promise<void> {
    const hasInterview: boolean = await this._interviewRepository.exists({
      id: InterviewId,
    });
    if (!hasInterview) throwsException(new InvalidParamError('userId'));
  }
}
