import { CompanyModel } from '@core/company/infrastructure/company.model';
import { InterviewModel } from '@core/interview/infrastructure/interview.model';
import { UserModel } from '@core/user/infrastructure/user.model';
import { BaseModel } from 'src/libs/shared/src/infrastructure/db/postgres/models/base.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  TableInheritance,
} from 'typeorm';

@Entity({
  name: 'job_applications',
  schema: 'hackaton',
})
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class JobApplicationModel extends BaseModel {
  @Column({ type: 'varchar', nullable: true })
  position: string;

  @Column({ type: 'varchar', nullable: true })
  link: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({
    type: 'varchar',
    default: 'APPLIED',
  })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  salary: number;

  @Column({ type: 'boolean', default: false })
  is_equity: boolean;

  @Column({ type: 'boolean', default: false })
  is_international: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  applied_at: Date;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @ManyToOne(() => CompanyModel, (company) => company.jobApplications, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyModel;

  @OneToMany(() => InterviewModel, (interview) => interview.jobApplication)
  interviews: InterviewModel[];

  @Column({ default: false })
  companyDeleted: boolean;
}
