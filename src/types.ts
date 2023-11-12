export interface User {
  id: string;
  username: string;
  password: string;
  devices: Device[];
}

export interface UserData {
  accessToken: string;
  id: number;
  username: string;
}
export interface Device {
  id: number;
  name: string;
  power: string;
  status: string;
  userId: string;
  user: User;
}
