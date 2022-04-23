import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {UserLoginRes} from '../interfaces/user/user-login-res'
import {map, tap} from 'rxjs/operators'
import {Get} from '../interfaces/login/get'
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor{
  sessionActive = false
  accessToken = ''

  constructor(private http: HttpService, private userService: UserService) { }

   userLogged(): Observable<boolean>{
    if(sessionStorage.getItem('loggedIn') == 'true'){
      console.log('session true')
      return new Observable<boolean>(subscriber => subscriber.next(true))
    }
     return this.http.sessionCheck().pipe(
       tap((x:Get) => {
         if(x.requestInfo.loggedIn){
           console.log('4')
           this.sessionActive = true;
           sessionStorage.setItem('accessToken', x.requestInfo.accessToken)
           this.accessToken = x.requestInfo.accessToken;
           this.userService.load(x.user);
           sessionStorage.setItem('loggedIn', 'true')
         }
      }),
      map<Get, boolean>(x=> this.sessionActive))
  }

  getUserInfo<UserLoginRes>(username: string, password:string, create_session:boolean){
    //authenticate credentials and return user info
    return this.http.checkUser(username, password, create_session).pipe(tap(user => {
      if(user.requestInfo.success){
        sessionStorage.setItem('accessToken', user.requestInfo.accessToken)
        sessionStorage.setItem('loggedIn', 'true')
        this.userService.load(user.user)
      }
      else {
        sessionStorage.setItem('loggedIn', 'false')
      }
      }))
  }

  public logout(){
    this.http.deleteSession();
    sessionStorage.setItem('loggedIn', 'false');//todo  pri loginu ukladat info jestli pernamentni session
  }

  public login(){
    sessionStorage.setItem('loggedIn', 'true');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', sessionStorage.getItem('accessToken') ?? '')
    })
    return next.handle(authReq)
  }


}

