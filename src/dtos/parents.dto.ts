import { IsString, IsEmail } from 'class-validator';

export class CreateParentDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public address: string;

  @IsString()
  public phone_numer: string;

  @IsString()
  public full_name: string;
}
