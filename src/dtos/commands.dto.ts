import { CommandEnum, CommandStatusEnum } from '@/enums/commands.enum';
import { IsString, IsEnum } from 'class-validator';

export class ExecuteCommandDto {
  @IsString()
  public device_id: string;

  @IsEnum(CommandEnum)
  public command: CommandEnum;

  @IsEnum(CommandStatusEnum)
  public status: CommandEnum;

  @IsString()
  public payload: string;
}
