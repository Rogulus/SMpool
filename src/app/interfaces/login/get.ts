import {User} from "../user/user";

export interface login_info_fields_get{
  loggedIn: boolean,
  accessToken: string
}

export interface user_fields{
  admin: boolean,
  username: string,
  fullName: string,
  email: string
}

export interface Get {
  requestInfo: login_info_fields_get,
  user: User
}



