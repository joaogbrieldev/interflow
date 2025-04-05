import { UserModel } from '@core/user/infrastructure/user.model';
import { BaseModel } from 'src/libs/shared/src/infrastructure/db/postgres/models/base.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  TableInheritance,
} from 'typeorm';

@Entity({
  name: 'job_applications',
  schema: 'hackaton',
})
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class JobApplicationModel extends BaseModel {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  link: string;

  @Column({ type: 'varchar', nullable: true })
  company_name: string;

  @Column({ type: 'varchar', nullable: true })
  directContact: string;

  @Column({ type: 'varchar', nullable: true })
  interviewDate: string;

  @Column({ type: 'varchar', nullable: true })
  companyFeedback: string;

  @Column({ type: 'varchar', nullable: true })
  userFellings: string;

  @Column({
    type: 'varchar',
  })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  salary: number;

  @Column({ type: 'boolean', default: false })
  is_equity: boolean;

  @Column({ type: 'boolean', default: false })
  is_international: boolean;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;
}
