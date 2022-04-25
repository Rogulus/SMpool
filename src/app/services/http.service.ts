import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {tap,map, catchError} from 'rxjs/operators'

import {admin} from '../interfaces/admin/get'
import {UserLogin} from '../interfaces/user/userLogin'
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {UserLoginRes} from "../interfaces/user/user-login-res";
import {UserRegistrationRes} from "../interfaces/user/user-registration-res";
import {Get} from "../interfaces/login/get";
import {AdminRegistration, AdminRegistrationInfo} from "../interfaces/admin/admin-registration";
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";
import {newUserTokenRes} from "../interfaces/user/new-user-token-res";


@Injectable({
  providedIn: 'root'
})
export class HttpService {
/*
    myslenka:
    componenta by se nemala starat, takze synchronizace a rozposilani dat resi tato service
    registrace by mela naplnit user data
    login by mel naplnit user data
    put by mel naplnit user data
*/



  response: any
  url ="/api/";
  httpOptions = {
    observe: 'body',
    responseType: 'json'
  }

  constructor(private http:HttpClient) { }


  getAdmin(): Observable<admin> {
    return  this.http.get<admin>(this.url + 'infoAdmin', {
        observe: 'body',
        responseType: 'json'
      }
    )
  }

  //post //admin
    registerAdmin(username: string, fullName: string, email: string, password: string): Observable<AdminRegistration>{
/*    class AdminRegister {
      username: string = '';
      fullName: string = '';
      email: string = '';
      password: string = '';
      constructor(username: string, fullName: string, email: string, password: string) {
        this.username = username;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
      }
    }*/
/*    let admin = new AdminRegister(username, fullName, email, password)*/
    /*    let headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:5000/!*");*/
    return this.http.post<AdminRegistration>(this.url + 'registerAdmin' ,
      {
      username: username,
      fullName: fullName,
      email: email,
      password: password
      },
      {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      catchError(HttpService.handleError))
  }


//login
  sessionCheck(): Observable<Get>{
    let headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:5000/*");
    return this.http.get<Get>(this.url + 'login' ,{
      /*    let headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:5000/!*");*/
      headers: headers,
      observe: 'body',
      responseType: 'json',
      withCredentials: true
    }).pipe(catchError(HttpService.handleError)
    )
  }

  //login
  checkUser(username:string, password: string, createSession: boolean): Observable<UserLoginRes>{
    let user = new UserLogin(username, password, createSession);
    /*    let headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:5000/!*");*/
    return this.http.put<UserLoginRes>(this.url + 'login' , user ,{
      /*      headers: headers,*/
      observe: 'body',
      responseType: 'json'
    }).pipe(catchError(HttpService.handleError)
    )
  }

  //login delete
  //ends the session
  deleteSession(){
      this.http.delete<any>(this.url + 'login',{
      observe: 'body',
      responseType: 'json'
    }).pipe(catchError(HttpService.handleError)).subscribe(x=>{
      console.log('hotoco delete')
      })
    console.log('delete session')
    return
  }


  //register
  registerPost(username: string, adminToken:string, password:string): Observable<UserRegistrationRes>{
    class UserRegister {
      username: string = '';
      adminToken: string = '';
      password: string = '';
      constructor(username: string, adminToken: string, password: string) {
        this.username = username;
        this.adminToken = adminToken;
        this.password = password;
      }
    }
    let user = new UserRegister(username, adminToken, password)
/*    let headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:5000/!*");*/
    return this.http.post<UserRegistrationRes>(this.url + 'registration' , user ,{
      observe: 'body',
      responseType: 'json'
    }).pipe(catchError(HttpService.handleError)
    )
  }

//get token for new user
  getNewUserToken(): Observable<newUserTokenRes>{
    let headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:5000/*");
    return this.http.post<newUserTokenRes>(this.url + 'admin/createUser',null,{
        headers: headers,
        observe: 'body',
        responseType: 'json',
        withCredentials: true
    }).pipe(catchError(HttpService.handleError)
    )
  }







  private static handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Client side error', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


/*  private log(url: string, data: string) {
    const message = `DownloaderService downloaded "${url}" and got "${data}".`;
    console.log(message)
  }

  private logError(url: string, error: any) {
    const message = `DownloaderService failed to download "${url}"; got error "${error.message}".`;
    console.log(message);
  }*/


 // private errHandler(){
  //  console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
   // return of(new AdminIsSet(false))
  //}
}
