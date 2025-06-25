import { JobApplicationModel } from '@core/job-application/infrastructure/job-application.model';
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
import { Contact } from '../domain/contact.vo';

@Entity({
  name: 'companies',
  schema: 'hackaton',
})
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class CompanyModel extends BaseModel {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'json', nullable: true })
  phone: string;

  @Column({ type: 'json', nullable: true })
  contact: Contact[];

  @Column({ type: 'varchar', nullable: true })
  website: string;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @OneToMany(
    () => JobApplicationModel,
    (jobApplication) => jobApplication.company,
  )
  jobApplications: JobApplicationModel[];
}
