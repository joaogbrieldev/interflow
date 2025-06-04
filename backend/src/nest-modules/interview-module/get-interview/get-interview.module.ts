import { GetInterviewDataModule } from '@core/interview/application/use-cases/get-interview/get-interview.module';
import { Module } from '@nestjs/common';
import { GetInterviewController } from './get-interview.controller';

@Module({
  imports: [GetInterviewDataModule],
  controllers: [GetInterviewController],
  providers: [],
})
export class GetInterviewModule {}
