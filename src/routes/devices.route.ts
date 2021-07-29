import { RequestHandler, Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { authParentMiddleware } from '@middlewares/auth.middleware';
import DevicesController from '@/controllers/devices.controller';
import { CreateAndroidDeviceDto } from '@/dtos/devices.dto';
import { DevicesEnum } from '@/enums/devices.enum';
import { RequestWithParent } from '@/interfaces/auth.interface';
import { DevicePolicyDto } from '@/dtos/android.dto';

function addDevicetype(type: DevicesEnum): RequestHandler {
  return (req: RequestWithParent, res, next) => {
    req.body.type = type;
    next();
  };
}

class DeviceRoute implements Routes {
  public path = '/devices';
  public router = Router();
  public devicesController = new DevicesController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authParentMiddleware(), this.devicesController.get);
    this.router.get(`${this.path}/:id(\\d+)`, authParentMiddleware(), this.devicesController.getById);
    this.router.delete(`${this.path}/:id(\\d+)`, authParentMiddleware(), this.devicesController.delete);

    // Android Routes
    this.router.post(
      `${this.path}/android`,
      authParentMiddleware(),
      addDevicetype(DevicesEnum.Android),
      validationMiddleware(CreateAndroidDeviceDto, 'body'),
      this.devicesController.create,
    );

    this.router.put(
      `${this.path}/android/:id(\\d+)/policy`,
      authParentMiddleware(),
      validationMiddleware(DevicePolicyDto, 'body', true),
      this.devicesController.updateDevicePolicy,
    );
  }
}

export default DeviceRoute;
