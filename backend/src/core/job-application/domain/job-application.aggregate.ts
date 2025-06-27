import { CompanyAggregate } from '@core/company/domain/company.aggregate';
import { User } from '@core/user/domain/user.aggregate';
import { EntityBase } from 'src/libs/shared/src/data-layer/entities/entity-base';
import { JobApplicationFakerBuilder } from './job-application-fake.builder';

export type JobApplicationConstructorProps = {
  id?: string;
  position: string;
  name: string;
  link: string;
  status: string;
  salary: number;
  isEquity: boolean;
  isInternational: boolean;
  createdAt?: Date;
  user: User;
  company: CompanyAggregate;
};

export type JobApplicationCreateCommand = {
  link: string;
  position: string;
  name: string;
  company: CompanyAggregate;
  status: string;
  salary: number;
  isEquity: boolean;
  isInternational: boolean;
  user: User;
};

export class JobApplication extends EntityBase {
  link: string;
  status: string;
  position: string;
  name: string;
  company: CompanyAggregate;
  salary: number;
  isEquity: boolean;
  isInternational: boolean;
  user: User;

  constructor(props: JobApplicationConstructorProps) {
    super();
    Object.assign(this, props);
  }

  static create(props: JobApplicationCreateCommand) {
    const jobApplication = new JobApplication({
      ...props,
    });
    return jobApplication;
  }

  defineLink(link: string): JobApplication {
    this.link = link;
    return this;
  }

  defineName(name: string): JobApplication {
    this.name = name;
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
    return this.id;
  }

  toJSON() {
    return {
      id: this.id,
      link: this.link,
      status: this.status,
      salary: this.salary,
      isEquity: this.isEquity,
      position: this.position,
      name: this.name,
      isInternational: this.isInternational,
      createdAt: this.createdAt,
    };
  }
}
