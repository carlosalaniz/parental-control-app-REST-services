import { DevicePolicy } from '@/interfaces/android_device.interface';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

export class AndroidDevicePolicyModel implements DevicePolicy {
  @prop()
  _id: Schema.Types.ObjectId;
  @prop()
  application_daily_usage_limits: Map<string, number>;
  @prop()
  phone_daily_usage_limit: number;
  @prop()
  public name?: string;
  @prop({ type: () => [String] })
  public jobs?: string[];
}

export default function () {
  const model = getModelForClass(AndroidDevicePolicyModel); // UserModel is a regular Mongoose Model with correct types
  return model;
}
