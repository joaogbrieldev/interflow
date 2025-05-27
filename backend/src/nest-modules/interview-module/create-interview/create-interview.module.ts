import { CreateInterviewDataModule } from '@core/interview/application/use-cases/create-interview/create-interview.module';
import { Module } from '@nestjs/common';
import { CreateInterviewController } from './create-interview.controller';
import { CreateInterviewDataMapper } from './create-interview.data-mapper';
import { CreateInterviewValidator } from './create-interview.validator';

@Module({
  imports: [CreateInterviewDataModule],
  controllers: [CreateInterviewController],
  providers: [CreateInterviewDataMapper, CreateInterviewValidator],
})
export class CreateInterviewModule {}
