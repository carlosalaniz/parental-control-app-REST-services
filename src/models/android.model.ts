import { Sequelize, DataTypes, Model } from 'sequelize';
import { AndoridDevice } from '@/interfaces/android_device.interface';
import { DeviceModel } from './devices.model';

export class AndroidDeviceModel extends Model<AndoridDevice> implements AndoridDevice {
  fcm_registration_token: string;
  device_id: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof AndroidDeviceModel {
  AndroidDeviceModel.init(
    {
      device_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
      },
      fcm_registration_token: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: 'android_devices',
      sequelize,
    },
  );
  AndroidDeviceModel.removeAttribute('id');
  AndroidDeviceModel.belongsTo(DeviceModel, {
    foreignKey: {
      field: 'device_id',
      allowNull: false,
    },
  });
  return AndroidDeviceModel;
}
