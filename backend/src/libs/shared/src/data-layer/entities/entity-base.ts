import { IEntityBase } from '../../domain/models/entities/entity-base';

export class EntityBase implements IEntityBase {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(id?: string) {
    this.id = id;
  }
  static isEntity(value: any): boolean {
    return value instanceof EntityBase;
  }
}
