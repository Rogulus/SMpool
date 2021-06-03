import { Action, ActionReducer } from '@ngrx/store';
import { UserModel } from '../models/user-model';


export enum UserActionTypes{
  ADD_USER = '[USER] ADD',

  DELETE_USER = '[USER] DELETE'
}

export class AddUserAction implements Action{
  readonly type = UserActionTypes.ADD_USER;
  constructor(public payload: UserModel) {}
}

export class DeleteUserAction implements Action{
  readonly type = UserActionTypes.DELETE_USER;
  constructor(public payload: string) {}
}

export type UserActions = AddUserAction | DeleteUserAction;
