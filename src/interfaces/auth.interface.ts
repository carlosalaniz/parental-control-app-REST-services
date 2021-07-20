import { Request } from 'express';
import { Parent } from '@/interfaces/parents.interface';
import { Device } from './devices.interface';

export interface DataStoredInToken {
  id: number;
  type: 'Device' | 'Parent';
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithParentOrDevice extends Request {
  user: {
    user: Parent | Device;
    type: 'Device' | 'Parent';
  };
}
