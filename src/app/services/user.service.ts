import { Injectable } from '@angular/core';
import{ UserLogin } from '../interfaces/user/userLogin'
import

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: UserLogin[] = []
  activeUser: UserLogin
  constructor() {

  }


}
