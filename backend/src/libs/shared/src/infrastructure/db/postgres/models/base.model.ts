import { IEntityBase } from 'src/libs/shared/src/domain/models/entities/entity-base';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseModel implements IEntityBase {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    generated: true,
    nullable: false,
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    generated: true,
    nullable: false,
  })
  updatedAt?: Date;
}
