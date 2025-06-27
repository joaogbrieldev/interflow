import { IInterviewRepository } from '@core/interview/domain/contracts/repository/interview.repository';
import { Injectable } from '@nestjs/common';
import {
  IDeleteInterviewInput,
  IDeleteInterviewOutput,
  IDeleteInterviewUseCase,
} from 'src/core/interview/domain/contracts/use-cases/delete-interview';
import { NotFoundError } from 'src/libs/shared/src/domain/errors/application/not-found.error';

@Injectable()
export class DeleteInterviewUseCase implements IDeleteInterviewUseCase {
  constructor(private readonly interviewRepository: IInterviewRepository) {}

  async execute(input: IDeleteInterviewInput): Promise<IDeleteInterviewOutput> {
    const interview = await this.interviewRepository.getOne({
      id: input.interviewId,
    });

    if (!interview) {
      throw new NotFoundError('Interview not found');
    }

    await this.interviewRepository.delete(interview.id);

    return { interviewId: input.interviewId };
  }
}
