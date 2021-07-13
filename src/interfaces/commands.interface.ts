export interface Command {
  id: number;
  device_id: number;
  command: number;
  status: number;
  payload: string;
}
