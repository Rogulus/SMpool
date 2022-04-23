import {User} from "./user";

export interface login_info_fields_put {
  exists: boolean;
  success: boolean;
  accessToken: string;
}

export interface UserLoginRes {
  requestInfo: login_info_fields_put
  user:User;
}
