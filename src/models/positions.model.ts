import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Positions } from '@/interfaces/positions.interface';
import { DeviceModel } from './devices.model';

export type ParentCreationAttributes = Optional<Positions, 'id'>;

export class DevicePositionModel extends Model<Positions, ParentCreationAttributes> implements Positions {
  id: number;
  device_id: number;
  request_date: Date;
  position: Object;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof DevicePositionModel {
  DevicePositionModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      device_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: DeviceModel,
          key: 'id',
        },
      },
      request_date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      position: {
        allowNull: false,
        type: DataTypes.GEOMETRY,
      },
    },
    {
      tableName: 'device_positions',
      sequelize,
    },
  );
  return DevicePositionModel;
}
