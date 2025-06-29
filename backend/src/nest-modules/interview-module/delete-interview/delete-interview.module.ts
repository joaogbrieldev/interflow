import { DeleteInterviewDataModule } from '@core/interview/application/use-cases/delete-interview/delete-interview.module';
import { Module } from '@nestjs/common';
import { DeleteInterviewController } from './delete-interview.controller';

@Module({
  imports: [DeleteInterviewDataModule],
  controllers: [DeleteInterviewController],
  providers: [],
})
export class DeleteInterviewModule {}
