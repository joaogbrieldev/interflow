import { EntityBase } from 'src/libs/shared/src/data-layer/entities/entity-base';
import { Uuid } from 'src/libs/shared/src/domain/models/value-objects/uuid.vo';
import { JobApplicationFakerBuilder } from './job-application-fake.builder';

export type JobApplicationConstructorProps = {
  job_application_id?: JobApplicationId;
  name: string;
  link: string;
  status: string;
  salary: number;
  isEquity: boolean;
  isInternational: boolean;
  user_id: string;
  company_name: string;
  directContact: string;
  interviewDate: string;
  companyFeedback: string;
  userFellings: string;
};

export type JobApplicationCreateCommand = {
  name: string;
  link: string;
  status: string;
  salary: number;
  isEquity: boolean;
  isInternational: boolean;
  user_id: string;
  company_name: string;
  interviewDate: string;
  directContact: string;
  companyFeedback: string;
  userFellings: string;
};

export class JobApplicationId extends Uuid {}

export class JobApplication extends EntityBase {
  job_application_id: JobApplicationId;
  name: string;
  link: string;
  status: string;
  salary: number;
  isEquity: boolean;
  isInternational: boolean;
  user_id: string;
  company_name: string;
  directContact: string;
  interviewDate: string;
  companyFeedback: string;
  userFellings: string;

  constructor(props: JobApplicationConstructorProps) {
    super();
    this.job_application_id =
      props.job_application_id ?? new JobApplicationId();
    this.name = props.name;
    this.link = props.link;
    this.status = props.status;
    this.salary = props.salary;
    this.isEquity = props.isEquity;
    this.isInternational = props.isInternational;
    this.user_id = props.user_id;
    this.company_name = props.company_name;
    this.directContact = props.directContact;
    this.interviewDate = props.interviewDate;
    this.userFellings = props.userFellings;
    this.companyFeedback = props.companyFeedback;
  }

  static create(props: JobApplicationCreateCommand) {
    const jobApplication = new JobApplication({
      ...props,
    });
    return jobApplication;
  }

  defineName(name: string): JobApplication {
    this.name = name;
    return this;
  }

  defineLink(link: string): JobApplication {
    this.link = link;
    return this;
  }

  updateStatus(status: string): JobApplication {
    this.status = status;
    return this;
  }

  updateEquity(isEquity: boolean): JobApplication {
    this.isEquity = isEquity;
    return this;
  }

  updateCompanyName(company_name: string): JobApplication {
    this.company_name = company_name;
    return this;
  }

  updateUCompanyFeedback(companyFeedback: string): JobApplication {
    this.companyFeedback = companyFeedback;
    return this;
  }

  updateUserFellings(userFellings: string): JobApplication {
    this.userFellings = userFellings;
    return this;
  }

  updateInternational(isInternational: boolean): JobApplication {
    this.isInternational = isInternational;
    return this;
  }

  updateSalary(salary: number): JobApplication {
    if (salary >= 0) this.salary = salary;
    return this;
  }

  static fake() {
    return JobApplicationFakerBuilder;
  }

  get entity_id() {
    return this.job_application_id;
  }

  toJSON() {
    return {
      job_application_id: this.job_application_id.id,
      name: this.name,
      link: this.link,
      status: this.status,
      salary: this.salary,
      isEquity: this.isEquity,
      isInternational: this.isInternational,
      company_name: this.company_name,
      directContact: this.directContact,
      interviewDate: this.interviewDate,
      userFellings: this.userFellings,
      companyFeedback: this.companyFeedback,
    };
  }
}
