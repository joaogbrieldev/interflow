import { Module } from '@nestjs/common';
import { JobApplicationModule } from './nest-modules/job-application-module/job-application.module';
import { PostgresModule } from './nest-modules/postgres-module/postgres.module';
import { UserModule } from './nest-modules/user-module/user.module';

@Module({
  imports: [PostgresModule, UserModule, JobApplicationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
