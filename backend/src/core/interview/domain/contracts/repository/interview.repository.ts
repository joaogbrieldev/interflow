import { IRepositoryBase } from 'src/libs/shared/src/domain/contracts/infrastructure/repository-base';
import { InterviewAggregate } from '../../interview.aggregate';

export abstract class IInterviewRepository extends IRepositoryBase<InterviewAggregate> {}
