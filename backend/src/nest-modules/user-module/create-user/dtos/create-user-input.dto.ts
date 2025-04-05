import {
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

export type CreateUserInputConstructorProps = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  constructor(props: CreateUserInputConstructorProps) {
    if (!props) return;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }
}

export class ValidateCreateUserInput {
  static validate(input: CreateUserInputDto) {
    return validateSync(input);
  }
}
