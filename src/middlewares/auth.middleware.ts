import { NextFunction, RequestHandler, Response } from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithParentOrDevice } from '@interfaces/auth.interface';

const authParentMiddleware = (): RequestHandler => {
  return async (req: RequestWithParentOrDevice, res: Response, next: NextFunction) => {
    try {
      const Authorization = req.cookies['Authorization'] || req.header('Authorization').split('Bearer ')[1] || null;
      if (Authorization) {
        const secretKey: string = config.get('secretKey');
        //throws error if token not verified
        const verificationResponse = jwt.verify(Authorization, secretKey) as DataStoredInToken;
        const userId = verificationResponse.id;
        const findUser = await DB.Parents.findByPk(userId);
        if (verificationResponse.type == 'Parent' && findUser !== null) {
          req.user = {
            user: findUser,
            type: 'Parent',
          };
          next();
        } else {
          next(new HttpException(401, 'Wrong authentication token'));
        }
      } else {
        next(new HttpException(404, 'Authentication token missing'));
      }
    } catch (error) {
      next(new HttpException(401, 'Wrong authentication token'));
    }
  };
};

const authChildDeviceMiddleware = (): RequestHandler => {
  return async (req: RequestWithParentOrDevice, res: Response, next: NextFunction) => {
    try {
      const Authorization = req.cookies['Authorization'] || req.header('Authorization').split('Bearer ')[1] || null;
      if (Authorization) {
        const secretKey: string = config.get('secretKey');
        //throws error if token not verified
        const verificationResponse = jwt.verify(Authorization, secretKey) as DataStoredInToken;
        const deviceId = verificationResponse.id;
        const findDevice = await DB.Devices.findByPk(deviceId);
        if (verificationResponse.type == 'Parent' && findDevice !== null) {
          req.user = {
            user: findDevice,
            type: 'Device',
          };
          next();
        } else {
          next(new HttpException(401, 'Wrong authentication token'));
        }
      } else {
        next(new HttpException(404, 'Authentication token missing'));
      }
    } catch (error) {
      next(new HttpException(401, 'Wrong authentication token'));
    }
  };
};
export default { authParentMiddleware, authChildDeviceMiddleware };
