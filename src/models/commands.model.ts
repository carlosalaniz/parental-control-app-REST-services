import { Command } from '@/interfaces/commands.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { DeviceModel } from './devices.model';

export class CommandModel extends Model<Command> implements Command {
  id: number;
  device_id: number;
  command: number;
  status: number;
  payload: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CommandModel {
  CommandModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
      },
      device_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      command: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      payload: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: 'android_devices',
      sequelize,
    },
  );
  CommandModel.belongsTo(DeviceModel, {
    foreignKey: {
      field: 'device_id',
      allowNull: false,
    },
  });
  return CommandModel;
}
