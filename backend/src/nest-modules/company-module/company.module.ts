import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateCompanyModule } from './create-company/create-company.module';

@Module({
  imports: [
    CreateCompanyModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class CompanyModule {}
