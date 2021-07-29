import { CreateDeviceDtoType } from '@/dtos/devices.dto';
import { Devices } from '@/interfaces/devices.interface';
import { RequestWithParent } from '@/interfaces/auth.interface';
import ChildrenService from '@/services/children.service';
import DevicesService from '@/services/devices.service';
import { NextFunction, Response } from 'express';
import CRUDController from './crud.controller';
import { DevicePolicyDto } from '@/dtos/android.dto';
class DevicesController extends CRUDController<Devices, CreateDeviceDtoType> {
  public dbService = new DevicesService();
  public childService = new ChildrenService();

  protected async createCall(req: RequestWithParent, res: Response, next: NextFunction) {
    try {
      const data: CreateDeviceDtoType = req.body;
      const parentChildren = await this.childService.findById(req.user.id, data.child_id);
      if (parentChildren != null) {
        const device = await this.dbService.create(data);
        res.status(201).json({ data: device, message: 'created' });
      } else {
        res.status(403).json({ message: 'forbidden' });
      }
    } catch (error) {
      next(error);
    }
  }

  protected async updateCall(req: RequestWithParent, res: Response, next: NextFunction) {
    try {
      const data: CreateDeviceDtoType = req.body;
      const parentChildren = await this.childService.findById(req.user.id, data.child_id);
      if (parentChildren != null) {
        super.update(req, res, next);
      } else {
        res.status(403).json({ message: 'forbidden' });
      }
    } catch (error) {
      next(error);
    }
  }

  protected async deleteCall(req: RequestWithParent, res: Response, next: NextFunction) {
    try {
      const deviceId = Number(req.params.id);
      const findOneData: Devices = await this.dbService.findById(deviceId);
      if (findOneData) {
        super.deleteCall(req, res, next);
      } else {
        res.status(403).json({ message: 'forbidden' });
      }
    } catch (error) {
      next(error);
    }
  }

  protected async getCall(req: RequestWithParent, res: Response, next: NextFunction) {
    try {
      const findAllData: Devices[] = await this.dbService.findAll(req.user.id);
      res.status(200).json({ data: findAllData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  }

  protected async getByIdCall(req: RequestWithParent, res: Response, next: NextFunction) {
    try {
      const deviceId = Number(req.params.id);
      const findOneData: Devices = await this.dbService.findById(deviceId, req.user.id);
      res.status(200).json({ data: findOneData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  }

  public updateDevicePolicy = async (req: RequestWithParent, res: Response, next: NextFunction) => {
    try {
      const data: DevicePolicyDto = req.body;
      const deviceId = Number(req.params.id);
      const devicePolicy = await this.dbService.updateDevicePolicy(deviceId, data);
      res.json(devicePolicy);
    } catch (error) {
      next(error);
    }
    next();
  };
}

export default DevicesController;
