import { JobApplicationModel } from '@core/job-application/infrastructure/job-application.model';
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
  @Column({ type: 'varchar', nullable: true })
  type: string;

  @Column({ type: 'timestamp', nullable: true })
  scheduled_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  initial_screen: Date;

  @Column({ type: 'varchar', nullable: true })
  interviewer_name: string;

  @Column({ type: 'varchar', nullable: true })
  interview_link: string;

  @Column({ type: 'text', nullable: true })
  feedback: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({
    enum: InterviewStatus,
    type: 'enum',
    default: InterviewStatus.SCHEDULED,
  })
  status: InterviewStatus;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @ManyToOne(
    () => JobApplicationModel,
    (jobApplication) => jobApplication.interviews,
  )
  @JoinColumn({ name: 'job_application_id' })
  jobApplication: JobApplicationModel;
}
