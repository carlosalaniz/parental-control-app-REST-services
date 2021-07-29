import { NextFunction, Request, Response } from 'express';
import CRUDService from '@/services/basecrud.service';

abstract class CRUDController<T, CreateTDTO extends object> {
  abstract dbService: CRUDService<T, CreateTDTO>;

  protected async getCall(req: Request, res: Response, next: NextFunction) {
    try {
      const findAllData: T[] = await this.dbService.findAll();
      res.status(200).json({ data: findAllData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  }

  protected async getByIdCall(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.id);
      const findOneData: T = await this.dbService.findById(userId);

      res.status(200).json({ data: findOneData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  }

  protected async createCall(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateTDTO = req.body;
      const createData: T = await this.dbService.create(data);

      res.status(201).json({ data: createData, message: 'created' });
    } catch (error) {
      next(error);
    }
  }

  protected async updateCall(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data: CreateTDTO = req.body;
      const updateData: T = await this.dbService.update(id, data);

      res.status(200).json({ data: updateData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  }

  protected async deleteCall(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const deleteData: T = await this.dbService.delete(id);

      res.status(200).json({ data: deleteData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }

  public get = async (req: Request, res: Response, next: NextFunction) => await this.getCall(req, res, next);

  public getById = async (req: Request, res: Response, next: NextFunction) => await this.getByIdCall(req, res, next);

  public create = async (req: Request, res: Response, next: NextFunction) => await this.createCall(req, res, next);

  public update = async (req: Request, res: Response, next: NextFunction) => await this.updateCall(req, res, next);

  public delete = async (req: Request, res: Response, next: NextFunction) => await this.deleteCall(req, res, next);
}
export default CRUDController;
