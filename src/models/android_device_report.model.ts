import { AndroidDeviceReport } from '@/interfaces/devices.interface';
import { prop, getModelForClass, DocumentType } from '@typegoose/typegoose';

export class AndroidDeviceReportModel implements AndroidDeviceReport {
  @prop()
  device_id: number;
  @prop()
  report_date: Date;
  @prop()
  application_daily_usage_report: { [key: string]: number };
  @prop()
  phone_daily_usage_report: number;
  @prop()
  location_report: [[number, number], Date][];
}

export default function () {
  const model = getModelForClass(AndroidDeviceReportModel); // UserModel is a regular Mongoose Model with correct types
  model.findOne({}).then((a: DocumentType<Object>) => a.remove());
  return model;
}
