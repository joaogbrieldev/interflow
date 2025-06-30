import { CompanyAggregate } from '@core/company/domain/company.aggregate';
import { CompanyModelMapper } from '@core/company/infrastructure/company.model-mapper';
import { User } from '@core/user/domain/user.aggregate';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepositoryPostgresAdapter } from 'src/libs/shared/src/infrastructure/db/postgres/base-repository.adapter';
import { getDataSourceName } from 'src/nest-modules/postgres-module/typeorm.config';
import { Repository } from 'typeorm';
import { IJobApplicationRepository } from '../domain/contracts/repository/job-application.repository';
import { JobApplication } from '../domain/job-application.aggregate';
import { JobApplicationModel } from './job-application.model';

@Injectable()
export class JobApplicationRepositoryAdapter
  extends BaseRepositoryPostgresAdapter<JobApplication, JobApplicationModel>
  implements IJobApplicationRepository
{
  constructor(
    @InjectRepository(JobApplicationModel, getDataSourceName())
    private readonly _jobApplicationRepository: Repository<JobApplicationModel>,
  ) {
    super(_jobApplicationRepository, JobApplicationModel);
  }

  mapToDomain(
    normalizedPersistencyObject: JobApplicationModel,
  ): JobApplication {
    const user = new User({
      id: normalizedPersistencyObject.user.id,
      name: normalizedPersistencyObject.user.name,
      email: normalizedPersistencyObject.user.email,
    });
    let company: CompanyAggregate;
    if (normalizedPersistencyObject.company) {
      company = CompanyModelMapper.mapToDomain(
        normalizedPersistencyObject.company,
      );
    }
    const jobApplication: JobApplication = new JobApplication({
      id: normalizedPersistencyObject.id,
      link: normalizedPersistencyObject.link,
      name: normalizedPersistencyObject.name,
      status: normalizedPersistencyObject.status,
      salary: normalizedPersistencyObject.salary,
      isEquity: normalizedPersistencyObject.is_equity,
      isInternational: normalizedPersistencyObject.is_international,
      createdAt: normalizedPersistencyObject.createdAt,
      position: normalizedPersistencyObject.position,
      user: user,
      company: company ?? null,
    });
    return jobApplication;
  }

  mapToModel(normalizedPersistencyObject: JobApplication): JobApplicationModel {
    const jobApplication: JobApplicationModel = new JobApplicationModel();
    jobApplication.id = normalizedPersistencyObject.id;
    jobApplication.link = normalizedPersistencyObject.link;
    jobApplication.status = normalizedPersistencyObject.status;
    jobApplication.salary = normalizedPersistencyObject.salary;
    jobApplication.is_equity = normalizedPersistencyObject.isEquity;
    jobApplication.is_international =
      normalizedPersistencyObject.isInternational;
    jobApplication.createdAt = normalizedPersistencyObject.createdAt;
    jobApplication.name = normalizedPersistencyObject.name;
    return jobApplication;
  }

  async updateJobApplication(
    jobApplicationId: string,
    jobApplication: JobApplication,
  ): Promise<JobApplication> {
    const jobApplicationModel = await this._jobApplicationRepository.findOne({
      where: { id: jobApplicationId },
    });

    if (!jobApplicationModel) {
      throw new Error('Job application not found');
    }

    jobApplicationModel.id = jobApplication.id;
    jobApplicationModel.link = jobApplication.link;
    jobApplicationModel.status = jobApplication.status;
    jobApplicationModel.salary = jobApplication.salary;
    jobApplicationModel.is_equity = jobApplication.isEquity;
    jobApplicationModel.is_international = jobApplication.isInternational;
    jobApplicationModel.name = jobApplication.name;

    const updatedJobApplicationModel =
      await this._jobApplicationRepository.save(jobApplicationModel);

    return this.mapToDomain(updatedJobApplicationModel);
  }
}
