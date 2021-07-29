import { IsString, IsDateString, IsInt, IsPhoneNumber } from 'class-validator';

export class CreateChildDto {
  @IsString()
  public name: string;

  @IsDateString()
  public birth_date: string;

  @IsInt()
  public gender: number;

  @IsPhoneNumber()
  public phone_number: string;
}
