import { NextFunction, Request, Response } from 'express';
import { CreateParentDto } from '@/dtos/parents.dto';
import { Parent } from '@/interfaces/parents.interface';
import parentService from '@/services/parents.service';

class ParentsController {
  public parentService = new parentService();

  public getParents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: Parent[] = await this.parentService.findAllParent();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getParentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: Parent = await this.parentService.findParentById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createParent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateParentDto = req.body;
      const createUserData: Parent = await this.parentService.createParent(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateParent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const userData: CreateParentDto = req.body;
      const updateUserData: Parent = await this.parentService.updateParent(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteParent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: Parent = await this.parentService.deleteParent(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ParentsController;
