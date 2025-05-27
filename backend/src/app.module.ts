import { Module } from '@nestjs/common';
import { CompanyModule } from './nest-modules/company-module/company.module';
import { InterviewModule } from './nest-modules/interview-module/interview.module';
import { JobApplicationModule } from './nest-modules/job-application-module/job-application.module';
import { PostgresModule } from './nest-modules/postgres-module/postgres.module';
import { UserModule } from './nest-modules/user-module/user.module';

@Module({
  imports: [
    PostgresModule,
    UserModule,
    JobApplicationModule,
    CompanyModule,
    InterviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
