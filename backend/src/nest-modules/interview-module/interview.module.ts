import { UpdateInterviewDataModule } from '@core/interview/application/use-cases/update-interview/update-interview.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateInterviewModule } from './create-interview/create-interview.module';
import { DeleteInterviewModule } from './delete-interview/delete-interview.module';
import { GetInterviewModule } from './get-interview/get-interview.module';

@Module({
  imports: [
    CreateInterviewModule,
    GetInterviewModule,
    UpdateInterviewDataModule,
    DeleteInterviewModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class InterviewModule {}
