import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {tap, map, catchError, retry} from 'rxjs/operators'

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
import {AutomaticFunctionsRes} from "../interfaces/system/automatic-functions-res";
import {GeneralUser} from "../interfaces/general-user";
import {UserRegistration} from "../interfaces/user/user-registration";
import {GeneralUserPut} from "../interfaces/general_user_put";



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

  retryNum = 3;

  constructor(private http:HttpClient) { }

  options():{}{
  let headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:5000/*");
    return {
      headers: headers,
      observe: 'body',
      responseType: 'json',
      withCredentials: true
    }
  }

  getAdmin(): Observable<admin> {
    return  this.http.get<admin>(this.url + 'infoAdmin', {
        observe: 'body',
        responseType: 'json'
      }
    ).pipe(
      retry(this.retryNum),
      catchError(HttpService.handleError))
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
      retry(this.retryNum),
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
    }).pipe(
      retry(this.retryNum),
      catchError(HttpService.handleError))
  }

  //login
  checkUser(username:string, password: string, createSession: boolean): Observable<UserLoginRes>{
    let user = new UserLogin(username, password, createSession);
    /*    let headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:5000/!*");*/
    return this.http.put<UserLoginRes>(this.url + 'login' , user ,{
      /*      headers: headers,*/
      observe: 'body',
      responseType: 'json'
    }).pipe(
      retry(this.retryNum),
      catchError(HttpService.handleError))
  }

  //login delete
  //ends the session
  deleteSession(){
      this.http.delete<any>(this.url + 'login',{
      observe: 'body',
      responseType: 'json'
    }).pipe(
        retry(this.retryNum),
        catchError(HttpService.handleError))
        .subscribe(x=>{
      console.log('hotoco delete')
      })
    console.log('delete session')
    return
  }


  //register
  registerPost(username: string, adminToken:string, password:string, fullName: string, email:string): Observable<UserRegistrationRes>{
    let newUser=<UserRegistration>{}
    newUser.adminToken = adminToken;
    newUser.username = username;
    newUser.fullName = fullName;
    newUser.email = email;
    newUser.password = password;

    console.log('email' + email);
    return this.http.post<UserRegistrationRes>(this.url + 'registration' , newUser ,this.options())
      .pipe(
        retry(this.retryNum),
        catchError(HttpService.handleError))
  }

//get token for new user
  getNewUserToken(): Observable<newUserTokenRes>{
    let headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:5000/*");
    return this.http.post<newUserTokenRes>(this.url + 'admin/createUser',null,{
        headers: headers,
        observe: 'body',
        responseType: 'json',
        withCredentials: true
    }).pipe(
      retry(this.retryNum),
      catchError(HttpService.handleError))
  }

    putAutomaticFunctionsData(data: AutomaticFunctionsRes): Observable<AutomaticFunctionsRes>{
    let headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:5000/*");
    console.log("jas");
    return this.http.put<AutomaticFunctionsRes>(this.url + 'pool/automaticFunctions',data,{
      headers: headers,
      observe: 'body',
      responseType: 'json',
      withCredentials: true
    }).pipe(
      retry(this.retryNum),
      catchError(HttpService.handleError))
  }

  getAutomaticFunctionsData(): Observable<AutomaticFunctionsRes>{
    let headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:5000/*");
    return this.http.get<AutomaticFunctionsRes>(this.url + 'pool/automaticFunctions' ,{
      headers: headers,
      observe: 'body',
      responseType: 'json',
      withCredentials: true
    }).pipe(
      retry(this.retryNum),
      catchError(HttpService.handleError))
  }


  getAllUsers(): Observable<GeneralUser[]>{
    return this.http.get<GeneralUser[]>(this.url + 'admin/allUsers', this.options())
      .pipe(catchError(HttpService.handleError))
  }

  deleteUser(username: string): Observable<GeneralUser[]>{
    return this.http.delete<GeneralUser[]>(this.url + 'user/'+username, this.options())
      .pipe(
        retry(this.retryNum),
        catchError(HttpService.handleError))
  }

  putUser(user: GeneralUser, origUsername: string, putPassword: boolean = false, password: string = ''): Observable<AutomaticFunctionsRes>{
    if(putPassword){
      let userWithPass = <GeneralUserPut>{ ...user};
      userWithPass['password'] = password;
      user = userWithPass;
    }
    return this.http.put<AutomaticFunctionsRes>(this.url + 'user/' + origUsername ,user, this.options())
      .pipe(
        retry(this.retryNum),
        catchError(HttpService.handleError)
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
