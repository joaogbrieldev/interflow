import { BaseModel } from 'src/libs/shared/src/infrastructure/db/postgres/models/base.model';
import { Column, Entity, TableInheritance } from 'typeorm';

@Entity({
  name: 'users',
  schema: 'hackaton',
})
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class UserModel extends BaseModel {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;
}
