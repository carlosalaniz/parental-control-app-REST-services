import { DevicesEnum } from '@/enums/devices.enum';
import { IsEnum, IsInt } from 'class-validator';

export class CreateDeviceDto {
  @IsEnum(DevicesEnum)
  public type: DevicesEnum;

  @IsInt()
  public child_id: number;

  @IsInt()
  public gender: number;
}
