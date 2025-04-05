import { JobApplicationModel } from '@core/job-application/infrastructure/job-application.model';
import { UserModel } from '@core/user/infrastructure/user.model';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { config } from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';

export const getDataSourceName = (): string => 'default';

config({ path: '.env' });

export const allModels: EntityClassOrSchema[] = [
  UserModel,
  JobApplicationModel,
];

export default new DataSource({
  type: 'postgres',
  schema: process.env.POSTGRES_SCHEMA,
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [UserModel, JobApplicationModel],
  migrations: [path.join(__dirname, 'migrations/*.{js,ts}')],
  logging: ['query', 'schema', 'error', 'warn', 'info', 'log'],
});
