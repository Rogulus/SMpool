import { Injectable } from '@angular/core';
import{ UserLogin } from '../interfaces/user/userLogin'
import {AuthService} from "./auth.service";
import {UserLoginRes} from "../interfaces/user/user-login-res";
import {User} from "../interfaces/user/user";
import {HttpService} from "./http.service";



@Injectable({
  providedIn: 'root'
})
export class UserService{
  user: any
  constructor(private httpService: HttpService) {

  }

  load(user: User){
      this.user = new User(user.admin, user.username, user.fullName, user.email)
  }

  refresh(){
  //todo? zavolat user get v auth mám token a ten posílám asi
  }

  get name(){
    return this.user? this.user.username: '';
  }

  get isAdmin(){
    if(this.user == null){
      console.log('neni nastaven user')
    }
    return this.user? this.user.admin: false;
  }




}
