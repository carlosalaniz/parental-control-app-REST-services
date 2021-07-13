export interface Device {
  id: number;
  child_id: number;
  type: number;
  last_known_position_id: number;
  device_locked: number;
  device_policy_id: string;
}
