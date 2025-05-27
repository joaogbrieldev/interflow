import { UserModel } from '@core/user/infrastructure/user.model';
import { BaseModel } from 'src/libs/shared/src/infrastructure/db/postgres/models/base.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  TableInheritance,
} from 'typeorm';
import { InterviewStatus } from '../domain/interview.aggregate';

@Entity({
  name: 'interviews',
  schema: 'hackaton',
})
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class InterviewModel extends BaseModel {
  @Column({ type: 'date', nullable: false })
  initialScreen: Date;

  @Column({ type: 'date', nullable: false })
  technicalInterviewDate: Date;

  @Column({ type: 'varchar' })
  interviewFeedback: string;

  @Column({
    enum: InterviewStatus,
    type: 'enum',
    default: InterviewStatus.SENT,
  })
  status: InterviewStatus;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;
}
