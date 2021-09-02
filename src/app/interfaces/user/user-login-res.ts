export interface UserLoginRes {
  exists: boolean;
  success: boolean;
  admin: boolean;
  username: string;
  fullname: string;
  email: string;
}
