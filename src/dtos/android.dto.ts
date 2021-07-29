import { IsDefined, Max, Min, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'applicationLimitsValidator', async: false })
export class ApplicationLimitsValidator implements ValidatorConstraintInterface {
  errorOn: string;
  actual: number;
  validate(values: { [key: string]: number }, args: ValidationArguments) {
    const { min, max } = args.constraints[0];

    for (const application in values) {
      if (values[application] < min || values[application] > max) {
        this.errorOn = application;
        this.actual = values[application];
        return false;
      }
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const { min, max } = args.constraints[0];
    // here you can provide default error message if validation failed
    return `${this.errorOn} should be between ${min} and ${max}, actual ${this.actual} `;
  }
}
export class DevicePolicyDto {
  @IsDefined()
  @Validate(ApplicationLimitsValidator, [{ min: 0, max: 2000 }])
  application_daily_usage_limits: { [key: string]: number };

  @Min(0)
  @Max(86400)
  phone_daily_usage_limit: number;
}

export class AndroidDeviceReport {
  device_id: number;
  report_date: Date;
  application_daily_usage_report: Map<string, number>;
  phone_daily_usage_report: number;
  location_report: [[number, number], Date][];
}
