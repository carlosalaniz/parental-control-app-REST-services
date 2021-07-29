import DB from '@databases';
import CRUDService from './basecrud.service';
import { CreateDeviceDtoType } from '@/dtos/devices.dto';
import { AndroidDevice, DevicePolicy, Devices } from '@/interfaces/devices.interface';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from '@/utils/util';
import { DevicesEnum } from '@/enums/devices.enum';
import { FindOptions } from 'sequelize';
import { flattenObject, TransactionModels } from './utils/util';
import { AndroidDeviceModel } from '@/models/android.model';
import { DeviceModel } from '@/models/devices.model';
import { DevicePolicyDto } from '@/dtos/android.dto';

const RollBackModels = async function (models) {
  while (models.length > 0) {
    const model = models.pop();
    if (model[2] === 'Sequelize') {
      await model[0].destroy();
    } else {
      await model[0].remove();
    }
  }
};

type DeviceModels = AndroidDeviceModel | DeviceModel;
class DevicesService extends CRUDService<Devices, CreateDeviceDtoType> {
  public model = null;
  public DevicePolicyModel = DB.AndroidDevicePolicies;
  public androidDeviceModel = DB.AndroidDevices;
  public baseDeviceModel = DB.Devices;
  public createDataType = 'CreateDtos';

  private parentWhereClause(parentId?: number) {
    return {
      attributes: {
        exclude: ['DeviceId'],
      },
      include: [
        {
          model: DB.Devices,
          required: true,
          as: 'Device',
          attributes: {
            exclude: ['id', 'ChildModelId'],
          },
          include: [
            {
              model: DB.Children,
              required: true,
              attributes: [],
              where:
                parentId != null
                  ? {
                      parent_id: parentId,
                    }
                  : {},
            },
          ],
        },
      ],
    } as FindOptions<Devices>;
  }

  private async getAllAndroidDevices(parentId?: number): Promise<AndroidDeviceModel[]> {
    if (parentId != null) {
      const allAndroid = await this.androidDeviceModel.findAll(this.parentWhereClause(parentId));
      return allAndroid;
    } else {
      return await this.androidDeviceModel.findAll({
        include: [
          {
            model: DB.Devices,
          },
        ],
      });
    }
  }

  public async findAll(parentId?: number): Promise<Devices[]> {
    // Add types of devices here
    const androidDevices = await this.getAllAndroidDevices(parentId);
    return await Promise.all([...androidDevices].map(device => flattenObject(device, 'Device')));
  }

  public async findById(recordId: number, parentId?: number): Promise<Devices> {
    if (isEmpty(recordId)) throw new HttpException(400, 'Bad Request');
    let findOne: DeviceModels;
    const whereCondition: FindOptions<AndroidDevice> = {
      where: { id: recordId },
      ...this.parentWhereClause(parentId),
    };
    const baseDevice = await this.baseDeviceModel.findByPk(recordId);
    if (baseDevice == null) {
      throw new HttpException(400, 'Bad Request');
    }
    switch (baseDevice.type) {
      case DevicesEnum.Android:
        findOne = await this.androidDeviceModel.findOne(whereCondition);
        break;
      case DevicesEnum.MacOS:
      case DevicesEnum.Windows:
      case DevicesEnum.iOS:
      default:
        throw new Error('Device type not supported.');
    }
    if (!findOne) throw new HttpException(400, 'Bad Request');
    return await flattenObject(findOne, 'Device');
  }

  public async create(createData: CreateDeviceDtoType) {
    const models: TransactionModels = [];
    try {
      const devicePolicy = await DB.AndroidDevicePolicies.create({});
      models.push(devicePolicy);
      switch (createData.type) {
        case DevicesEnum.Android:
          const device = await this.baseDeviceModel.create({ ...createData, device_policy_id: devicePolicy._id.toString() });
          models.push(device);
          const androidDevice = await this.androidDeviceModel.create({ id: device.id, ...createData });
          models.push(androidDevice);
          return androidDevice;
        case DevicesEnum.MacOS:
        case DevicesEnum.Windows:
        case DevicesEnum.iOS:
        default:
          throw new Error('Device type not supported.');
      }
    } catch (e) {
      //todo: add better messages.
      await RollBackModels(models);
      throw new HttpException(409, e.fields || e.message);
    }
  }

  public async update(modelId: number, modelData: CreateDeviceDtoType) {
    if (isEmpty(modelData)) throw new HttpException(400, "You're not" + this.createDataType);
    const findModel = await this.baseDeviceModel.findByPk(modelId);
    if (!findModel) throw new HttpException(409, "You're not" + this.createDataType);
    let updateModel: Devices;
    switch (modelData.type) {
      case DevicesEnum.Android:
        const findDevice = await this.androidDeviceModel.findByPk(modelId);
        updateModel = await findDevice.update(modelData);
        break;
      case DevicesEnum.MacOS:
      case DevicesEnum.Windows:
      case DevicesEnum.iOS:
      default:
        throw new Error('Device type not supported.');
    }
    return updateModel;
  }

  public async delete(modelId: number) {
    if (isEmpty(modelId)) throw new HttpException(400, "You're not id");
    const findBaseModel = await this.baseDeviceModel.findByPk(modelId);
    if (!findBaseModel) throw new HttpException(400, 'Bad Request');
    const whereCondition = {
      where: { id: modelId },
      include: [
        {
          model: DB.Devices,
          as: 'Device',
        },
      ],
    };
    let findModel;
    switch (findBaseModel.type) {
      case DevicesEnum.Android:
        findModel = await flattenObject(await this.androidDeviceModel.findOne(whereCondition), 'Device');
        await this.baseDeviceModel.destroy({ where: { id: modelId } });
        await this.DevicePolicyModel.findOneAndRemove({ _id: findModel.device_policy_id });
        break;
      case DevicesEnum.MacOS:
      case DevicesEnum.Windows:
      case DevicesEnum.iOS:
      default:
        throw new Error('Device type not supported.');
    }
    return findModel;
  }

  public async updateDevicePolicy(deviceId: number, data: DevicePolicyDto) {
    try {
      const baseDevice = await this.baseDeviceModel.findByPk(deviceId);
      const devicePolicy = await this.DevicePolicyModel.findById(baseDevice.device_policy_id).exec();
      for (const key in data) {
        devicePolicy[key] = data[key];
      }
      await devicePolicy.save();
      return devicePolicy as DevicePolicy;
    } catch (e) {
      console.log(e);
    }
  }
}

export default DevicesService;
