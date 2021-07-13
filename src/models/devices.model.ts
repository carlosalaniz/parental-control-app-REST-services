import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Device } from '@/interfaces/devices.interface';
import { ChildModel } from './children.model';

export type ChildCreationAttributes = Optional<Device, 'id'>;

export class DeviceModel extends Model<Device, ChildCreationAttributes> implements Device {
  id: number;
  child_id: number;
  type: number;
  last_known_position_id: number;
  device_locked: number;
  device_policy_id: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof DeviceModel {
  DeviceModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      child_id: {
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.TINYINT,
      },
      last_known_position_id: {
        type: DataTypes.INTEGER,
      },
      device_locked: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      device_policy_id: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'devices',
      sequelize,
    },
  );
  DeviceModel.belongsTo(ChildModel, {
    foreignKey: {
      field: 'child_id',
      allowNull: false,
    },
  });
  return DeviceModel;
}
