export type Devices = AndroidDevice | Device;

export interface Device {
  id: number;
  child_id: number;
  type: number;
  device_locked: number;
  device_policy_id: string;
  device_policy: DevicePolicy;
}

export interface AndroidDevice {
  id: number;
  fcm_registration_token: string;
}

export interface DevicePolicy {
  application_daily_usage_limits: { [key: string]: number };
  phone_daily_usage_limit: number;
}

export interface AndroidDeviceReport {
  device_id: number;
  report_date: Date;
  application_daily_usage_report: { [key: string]: number };
  phone_daily_usage_report: number;
  location_report: [[number, number], Date][];
}
