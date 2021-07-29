import { Parent } from '@/interfaces/parents.interface';
import { IsString, IsEmail } from 'class-validator';

export class CreateParentDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public address: string;

  @IsString()
  public phone_number: string;

  @IsString()
  public full_name: string;
}

export class LoginResquestParentDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class LoginResponseParentDto {
  public parent: Parent;
  public token: String;
}
