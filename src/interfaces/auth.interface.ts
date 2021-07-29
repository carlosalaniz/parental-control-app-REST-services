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

export interface RequestWithParent extends Request {
  user: Parent;
}

export interface RequestWithDevice extends Request {
  device: Device;
}
