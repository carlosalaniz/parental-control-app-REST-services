import { IsString } from 'class-validator';
import { CreateDeviceDto } from './devices.dto';

export class CreateAndroidDeviceDto extends CreateDeviceDto {
  @IsString()
  public fcm_registration_token: string;
}
