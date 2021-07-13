import { ObjectId } from 'mongoose';

export interface AndoridDevice {
  device_id: number;
  fcm_registration_token: string;
}

export interface DevicePolicy {
  _id: ObjectId;
  application_daily_usage_limits: Map<string, number>;
  phone_daily_usage_limit: number;
}

export interface AndroidDeviceReport {
  _id: ObjectId;
  device_id: number;
  report_date: Date;
  application_daily_usage_report: Map<string, number>;
  phone_daily_usage_report: number;
  location_report: [[number, number], Date][];
}
