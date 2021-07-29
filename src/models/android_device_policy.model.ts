import { DevicePolicy } from '@/interfaces/devices.interface';
import { prop, getModelForClass, ReturnModelType } from '@typegoose/typegoose';
import { Optional } from 'sequelize/types';
export type AndroidDevicePolicyModelType = ReturnModelType<typeof AndroidDevicePolicyModel>;
export type AndroidDevicePolicyCreationAttributes = Optional<DevicePolicy, 'application_daily_usage_limits' | 'phone_daily_usage_limit'>;
export class AndroidDevicePolicyModel implements DevicePolicy {
  @prop()
  application_daily_usage_limits: { [key: string]: number };
  @prop()
  phone_daily_usage_limit: number;
}

export default function (): AndroidDevicePolicyModelType {
  const model = getModelForClass(AndroidDevicePolicyModel);
  return model;
}
