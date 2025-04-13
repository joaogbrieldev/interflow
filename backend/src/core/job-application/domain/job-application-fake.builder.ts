import {
  FakeBuilder,
  PropOrFactory,
} from '../../../libs/shared/testing/fake.bulder';
import { JobApplication } from './job-application.aggregate';

export class JobApplicationFakerBuilder<
  TBuild = any,
> extends FakeBuilder<TBuild> {
  private _name: PropOrFactory<string> = () => `Job ${this._chance.word()}`;
  private _link: PropOrFactory<string> = () => this._chance.url();
  private _status: PropOrFactory<string> = () => this._chance.string();
  private _salary: PropOrFactory<number> = () =>
    this._chance.integer({ min: 30000, max: 150000 });
  private _isEquity: PropOrFactory<boolean> = () => this._chance.bool();
  private _isInternational: PropOrFactory<boolean> = () => this._chance.bool();

  private constructor(countObjs: number = 1) {
    super(countObjs);
  }

  static aJobApplication(): JobApplicationFakerBuilder<JobApplication> {
    return new JobApplicationFakerBuilder<JobApplication>();
  }

  static theJobApplications(
    countObjs: number,
  ): JobApplicationFakerBuilder<JobApplication[]> {
    return new JobApplicationFakerBuilder<JobApplication[]>(countObjs);
  }

  withName(name: string): JobApplicationFakerBuilder<TBuild> {
    this._name = name;
    return this;
  }

  withLink(link: string): JobApplicationFakerBuilder<TBuild> {
    this._link = link;
    return this;
  }

  withSalary(salary: number): JobApplicationFakerBuilder<TBuild> {
    this._salary = salary;
    return this;
  }

  withEquity(isEquity: boolean): JobApplicationFakerBuilder<TBuild> {
    this._isEquity = isEquity;
    return this;
  }

  withInternational(
    isInternational: boolean,
  ): JobApplicationFakerBuilder<TBuild> {
    this._isInternational = isInternational;
    return this;
  }

  build(): TBuild {
    const objects: JobApplication[] = new Array(this._countObjs)
      .fill(undefined)
      .map(
        () =>
          new JobApplication({
            name: this._callFactory(this._name),
            link: this._callFactory(this._link),
            status: this._callFactory(this._status),
            salary: this._callFactory(this._salary),
            isEquity: this._callFactory(this._isEquity),
            isInternational: this._callFactory(this._isInternational),
            user: null,
          }),
      );

    return (this._countObjs === 1 ? objects[0] : objects) as TBuild;
  }
}
