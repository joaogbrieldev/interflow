import { IInterviewRepository } from '@core/interview/domain/contracts/repository/interview.repository';
import {
  IGetInterviewsInput,
  IGetInterviewsUseCase,
} from '@core/interview/domain/contracts/use-cases/get-interview';
import { InterviewAggregate } from '@core/interview/domain/interview.aggregate';
import { Injectable } from '@nestjs/common';
import { throwsException } from 'src/libs/shared/src/data-layer/helper/exception';
import { IPaginatedResult } from 'src/libs/shared/src/domain/contracts/infrastructure/repository-base';
import { NotFoundError } from 'src/libs/shared/src/domain/errors/application/not-found.error';

@Injectable()
export class GetInterviewUseCase implements IGetInterviewsUseCase {
  constructor(private readonly _InterviewRepository: IInterviewRepository) {}

  async execute(
    input: IGetInterviewsInput,
  ): Promise<IPaginatedResult<InterviewAggregate>> {
    const { userId, page } = input;
    const interview = await this._InterviewRepository.paginate(
      page,
      undefined,
      {
        user: { id: userId },
      },
    );
    if (!interview) throwsException(new NotFoundError('Interview not found'));
    return interview;
  }
}
