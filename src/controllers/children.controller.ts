import { CreateChildDto } from '@/dtos/children.dto';
import { RequestWithParent } from '@/interfaces/auth.interface';
import { Child } from '@/interfaces/children.interface';
import ChildrenService from '@/services/children.service';
import { NextFunction, Response } from 'express';
import CRUDController from './crud.controller';

class ChildrenController extends CRUDController<Child, CreateChildDto> {
  public dbService = new ChildrenService();

  protected async createCall(req: RequestWithParent, res: Response, next: NextFunction) {
    try {
      req.body.parent_id = req.user.id;
      super.createCall(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  protected async updateCall(req: RequestWithParent, res: Response, next: NextFunction) {
    try {
      req.body.parent_id = req.user.id;
      super.updateCall(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  protected async deleteCall(req: RequestWithParent, res: Response, next: NextFunction) {
    try {
      const childId = Number(req.params.id);
      const findOneChild: Child = await this.dbService.findById(childId, req.user.id);
      if (findOneChild) {
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
      const findAllChildren: Child[] = await this.dbService.findAll(req.user.id);
      res.status(200).json({ data: findAllChildren, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  }

  protected async getByIdCall(req: RequestWithParent, res: Response, next: NextFunction) {
    try {
      const childId = Number(req.params.id);
      const findOneChild: Child = await this.dbService.findById(childId, req.user.id);
      res.status(200).json({ data: findOneChild, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  }
}

export default ChildrenController;
