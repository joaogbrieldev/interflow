import { validateSync } from 'class-validator';

export type CreateJobApplicationInputConstructorProps = {
  name: string;
  link: string;
  status: string;
  salary: number;
  isEquity: boolean;
  isInternational: boolean;
  userId: string;
  position: string;
  companyId: string;
};

export class CreateJobApplicationInputDto {
  name: string;
  link: string;
  status: string;
  isEquity: boolean;
  isInternational: boolean;
  salary: number;
  userId: string;
  position: string;
  companyId: string;

  constructor(props: CreateJobApplicationInputConstructorProps) {
    if (!props) return;
    this.name = props.name;
    this.link = props.link;
    this.status = props.status;
    this.isEquity = props.isEquity;
    this.isInternational = props.isInternational;
    this.salary = props.salary;
    this.userId = props.userId;
    this.position = props.position;
    this.companyId = props.companyId;
  }
}

export class ValidateCreateJobApplicationInput {
  static validate(input: CreateJobApplicationInputDto) {
    return validateSync(input);
  }
}
