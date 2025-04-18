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
    const jobApplication: JobApplication = new JobApplication({
      id: normalizedPersistencyObject.id,
      name: normalizedPersistencyObject.name,
      link: normalizedPersistencyObject.link,
      status: normalizedPersistencyObject.status,
      salary: normalizedPersistencyObject.salary,
      isEquity: normalizedPersistencyObject.is_equity,
      isInternational: normalizedPersistencyObject.is_international,
      user: user,
    });

    return jobApplication;
  }

  mapToModel(normalizedPersistencyObject: JobApplication): JobApplicationModel {
    const jobApplication: JobApplicationModel = new JobApplicationModel();
    jobApplication.id = normalizedPersistencyObject.id;
    jobApplication.name = normalizedPersistencyObject.name;
    jobApplication.link = normalizedPersistencyObject.link;
    jobApplication.status = normalizedPersistencyObject.status;
    jobApplication.salary = normalizedPersistencyObject.salary;
    jobApplication.is_equity = normalizedPersistencyObject.isEquity;
    jobApplication.is_international =
      normalizedPersistencyObject.isInternational;

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

    jobApplicationModel.name = jobApplication.name;
    jobApplicationModel.link = jobApplication.link;
    jobApplicationModel.status = jobApplication.status;
    jobApplicationModel.salary = jobApplication.salary;
    jobApplicationModel.is_equity = jobApplication.isEquity;
    jobApplicationModel.is_international = jobApplication.isInternational;

    const updatedJobApplicationModel =
      await this._jobApplicationRepository.save(jobApplicationModel);

    return this.mapToDomain(updatedJobApplicationModel);
  }
}
