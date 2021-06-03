import {UserModel} from '../models/user-model';
import {UserActions, UserActionTypes} from '../actions/usersAction'
import {State} from "@ngrx/store";

const initialState: UserModel = {
  userName: "Lada Kašpar",
  name: "Ladislav",
  surname: "Kašpar",
  email: "ladakaspar@szdc.cz",
  isAdmin: true,
}

export function userReducer (state: UserModel[] = [initialState], action: UserActions) {
  switch (action.type){
    case UserActionTypes.ADD_USER:
      return [...state, action.payload];
    case UserActionTypes.DELETE_USER:
      return state.filter(item => item.userName !== action.payload);
    default:
      return state;
  }
}
