import { IsDefined, IsString, Max, Min, min } from 'class-validator';
import { CreateDeviceDto } from './devices.dto';

export class CreateAndroidDeviceDto extends CreateDeviceDto {
  @IsString()
  public fcm_registration_token: string;
}

export class DevicePolicy {
  @IsDefined()
  @Min(0, { each: true })
  @Max(86400, { each: true })
  application_daily_usage_limits: Map<string, number>;

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
