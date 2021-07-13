import { IsInt, IsNumber } from 'class-validator';

export class CreateDevicePositionDto {
  @IsInt()
  public device_id: number;

  @IsNumber()
  public lat: number;

  @IsNumber()
  public lon: number;
}
