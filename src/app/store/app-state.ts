import { UserModel } from './models/user-model';

export interface AppState {
  readonly users: UserModel[];
  //tady dalsi modely az budou
}
