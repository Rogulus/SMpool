export interface GeneralUserPut {
  username: string;
  fullName: string;
  email: string;
  password: string,
  admin: boolean;
  activated: boolean;
}
