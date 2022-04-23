import {User} from '../user/user'

export interface AdminRegistrationInfo {
  success: boolean;
}

export interface AdminRegistration {
  adminRegistrationInfo: AdminRegistrationInfo
  user: User
}
