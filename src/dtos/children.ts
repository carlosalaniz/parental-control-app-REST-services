import { IsString, IsDateString, IsInt } from 'class-validator';

export class CreateChildDto {
  @IsString()
  public name: string;

  @IsDateString()
  public birth_date: string;

  @IsInt()
  public gender: number;
}
