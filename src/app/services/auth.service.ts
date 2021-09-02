import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {UserLoginRes} from '../interfaces/user/user-login-res'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService) { }

  getUserInfo<UserLoginRes>(username: string, password:string){
    //authenticate credentials and return user info
    return this.http.checkUser(username, password)
  }
}
