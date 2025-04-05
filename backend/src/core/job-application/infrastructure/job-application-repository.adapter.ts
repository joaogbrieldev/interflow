import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepositoryPostgresAdapter } from 'src/libs/shared/src/infrastructure/db/postgres/base-repository.adapter';
import { getDataSourceName } from 'src/nest-modules/postgres-module/typeorm.config';
import { Repository } from 'typeorm';
import { IJobApplicationRepository } from '../domain/contracts/repository/job-application.repository';
import {
  JobApplication,
  JobApplicationId,
} from '../domain/job-application.aggregate';
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
    const jobApplication: JobApplication = new JobApplication({
      job_application_id: new JobApplicationId(normalizedPersistencyObject.id),
      name: normalizedPersistencyObject.name,
      link: normalizedPersistencyObject.link,
      status: normalizedPersistencyObject.status,
      salary: normalizedPersistencyObject.salary,
      isEquity: normalizedPersistencyObject.is_equity,
      isInternational: normalizedPersistencyObject.is_international,
      user_id: normalizedPersistencyObject.user_id,
      company_name: normalizedPersistencyObject.company_name,
      companyFeedback: normalizedPersistencyObject.companyFeedback,
      userFellings: normalizedPersistencyObject.userFellings,
      interviewDate: normalizedPersistencyObject.interviewDate,
      directContact: normalizedPersistencyObject.directContact,
    });
    return jobApplication;
  }
  async createJobApplication(
    JobApplication: JobApplication,
  ): Promise<JobApplication> {
    const JobApplicationEntity =
      this._jobApplicationRepository.create(JobApplication);
    const JobApplicationCreated =
      await this._jobApplicationRepository.save(JobApplicationEntity);
    return this.mapToDomain(JobApplicationCreated);
  }

  async getJobApplicationsByUser(userId: string): Promise<JobApplication[]> {
    const jobApplicationsModel = await this._jobApplicationRepository.find({
      where: { user_id: userId },
    });

    const jobApplications = jobApplicationsModel.map((item) =>
      this.mapToDomain(item),
    );

    return jobApplications;
  }
  async updateJobApplication(
    jobApplicationId: any,
    jobApplication: JobApplication,
  ): Promise<JobApplication> {
    const jobApplicationModel = await this._jobApplicationRepository.findOne({
      where: { id: jobApplicationId.id },
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
    jobApplicationModel.user_id = jobApplication.user_id;
    jobApplicationModel.company_name = jobApplication.company_name;
    jobApplicationModel.companyFeedback = jobApplication.companyFeedback;
    jobApplicationModel.directContact = jobApplication.directContact;
    jobApplicationModel.interviewDate = jobApplication.interviewDate;
    jobApplicationModel.userFellings = jobApplication.userFellings;

    const updatedJobApplicationModel =
      await this._jobApplicationRepository.save(jobApplicationModel);

    return this.mapToDomain(updatedJobApplicationModel);
  }
}
