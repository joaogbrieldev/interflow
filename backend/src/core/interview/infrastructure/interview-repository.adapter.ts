import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepositoryPostgresAdapter } from 'src/libs/shared/src/infrastructure/db/postgres/base-repository.adapter';
import { getDataSourceName } from 'src/nest-modules/postgres-module/typeorm.config';
import { Repository } from 'typeorm';
import { IInterviewRepository } from '../domain/contracts/repository/interview.repository';
import { InterviewAggregate } from '../domain/interview.aggregate';
import { InterviewModel } from './interview.model';
import { InterviewModelMapper } from './interview.model-mapper';

@Injectable()
export class interviewRepositoryAdapter
  extends BaseRepositoryPostgresAdapter<InterviewAggregate, InterviewModel>
  implements IInterviewRepository
{
  constructor(
    @InjectRepository(InterviewModel, getDataSourceName())
    private readonly _interviewRepository: Repository<InterviewModel>,
  ) {
    super(_interviewRepository, InterviewModel);
  }

  mapToDomain(normalizedPersistencyObject: InterviewModel): InterviewAggregate {
    return InterviewModelMapper.toEntity(normalizedPersistencyObject);
  }

  mapToModel(normalizedPersistencyObject: InterviewAggregate): InterviewModel {
    return InterviewModelMapper.toModel(normalizedPersistencyObject);
  }
}
