import { UserModel } from '@core/user/infrastructure/user.model';
import { BaseModel } from 'src/libs/shared/src/infrastructure/db/postgres/models/base.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'json' })
  phone: string;

  @Column({ type: 'json' })
  contact: Contact[];

  @Column({ type: 'varchar', default: false })
  website: string;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;
}
