import { DevicesEnum } from '@/enums/devices.enum';
import { IsEnum, IsInt, IsString } from 'class-validator';

export class CreateBaseDeviceDto {
  @IsEnum(DevicesEnum)
  public type: DevicesEnum;

  @IsInt()
  public child_id: number;
}

export class CreateAndroidDeviceDto extends CreateBaseDeviceDto {
  @IsString()
  public fcm_registration_token: string;
}

export type CreateDeviceDtoType = CreateAndroidDeviceDto;
