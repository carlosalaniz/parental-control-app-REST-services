import { AndroidDeviceReport } from '@/interfaces/android_device.interface';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

export class AndroidDeviceReportModel implements AndroidDeviceReport {
  @prop()
  _id: Schema.Types.ObjectId;
  @prop()
  device_id: number;
  @prop()
  report_date: Date;
  @prop()
  application_daily_usage_report: Map<string, number>;
  @prop()
  phone_daily_usage_report: number;
  @prop()
  location_report: [[number, number], Date][];
}

export default function () {
  const model = getModelForClass(AndroidDeviceReportModel); // UserModel is a regular Mongoose Model with correct types
  return model;
}
