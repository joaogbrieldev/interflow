import { JobApplicationModel } from '@core/job-application/infrastructure/job-application.model';
import { UserModel } from '@core/user/infrastructure/user.model';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'postgres',
        schema: process.env.POSTGRES_SCHEMA,
        host: process.env.POSTGRES_HOST,
        port: +process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        synchronize: false,
        logging: true,
        autoLoadEntities: false,
        entities: [UserModel, JobApplicationModel],
      }),
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource({
          ...options,
          migrations: ['migrations/*.{js,ts}'],
          name: 'default',
        }).initialize();
      },
    }),
  ],
})
export class PostgresModule {}
