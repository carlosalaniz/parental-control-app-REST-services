import { Sequelize, DataTypes, Model } from 'sequelize';
import { AndroidDevice } from '@/interfaces/devices.interface';
import { DeviceModel } from './devices.model';

export class AndroidDeviceModel extends Model<AndroidDevice> implements AndroidDevice {
  fcm_registration_token: string;
  id: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof AndroidDeviceModel {
  AndroidDeviceModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: DeviceModel,
          key: 'id',
        },
      },
      fcm_registration_token: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: 'android_devices',
      sequelize,
    },
  );
  AndroidDeviceModel.belongsTo(DeviceModel, {
    as: 'Device',
    foreignKey: {
      field: 'id',
    },
    onDelete: 'cascade',
  });
  return AndroidDeviceModel;
}
