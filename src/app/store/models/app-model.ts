import { UserModel } from './user-model';

export interface AppModel {
  readonly users: Array<UserModel>;
  readonly adminIsRegistered: Boolean;
}
