export interface IValidator<InputDto> {
  validate(input: InputDto): Promise<void>;
}
