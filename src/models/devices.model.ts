import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Device, DevicePolicy } from '@/interfaces/devices.interface';
import { ChildModel } from './children.model';
import { AndroidDevicePolicyModelType } from './android_device_policy.model';

export type DeviceCreationAttributes = Optional<Device, 'id' | 'device_locked' | 'device_policy_id' | 'device_policy'>;

export class DeviceModel extends Model<Device, DeviceCreationAttributes> implements Device {
  id: number;
  child_id: number;
  type: number;
  device_locked: number;
  device_policy_id: string;
  device_policy: DevicePolicy;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize, devicePolicyModel: AndroidDevicePolicyModelType): typeof DeviceModel {
  DeviceModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      child_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: ChildModel,
          key: 'id',
        },
      },
      type: {
        type: DataTypes.TINYINT,
      },
      device_locked: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      device_policy_id: {
        allowNull: true,
        unique: true,
        type: DataTypes.STRING,
      },
      device_policy: {
        type: DataTypes.VIRTUAL,
        async get() {
          const device_policy = await devicePolicyModel.findById(this.device_policy_id).exec();
          return device_policy.toJSON();
        },
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
    },
  });
  return DeviceModel;
}
