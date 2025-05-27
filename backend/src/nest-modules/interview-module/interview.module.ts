import { GetInterviewDataModule } from '@core/interview/application/use-cases/get-interview/get-interview.module';
import { UpdateInterviewDataModule } from '@core/interview/application/use-cases/update-interview/update-interview.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateInterviewModule } from './create-interview/create-interview.module';

@Module({
  imports: [
    CreateInterviewModule,
    GetInterviewDataModule,
    UpdateInterviewDataModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class InterviewModule {}
