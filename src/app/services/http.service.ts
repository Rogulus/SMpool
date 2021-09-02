import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {tap, catchError} from 'rxjs/operators'

import {admin} from '../interfaces/admin/get'
import {UserLogin} from '../interfaces/user/userLogin'
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {UserLoginRes} from "../interfaces/user/user-login-res";



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  response: any
  url ="http://127.0.0.1:5000/api/";
  httpOptions = {
    observe: 'body',
    responseType: 'json'
  }

  constructor(
    private http:HttpClient) { }

 /* updateHero(hero: UserLogin): Observable<UserLogin> {
    return this.http.put<UserLogin>(this.url, hero, {
        observe: 'body',
        responseType: 'json'
      }
    )
      .pipe(
        catchError(this.handleError('updateHero', hero))
      );
  }*/

  private handleError(error: HttpErrorResponse) {
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

  checkUser(username:string, password: string): Observable<UserLoginRes>{
    let user = new UserLogin(username, password);
    let headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:5000/*");

    return this.http.put<UserLoginRes>(this.url + 'login' , user ,{
      headers: headers,
      observe: 'body',
      responseType: 'json'
    }).pipe(catchError(this.handleError)
    )
  }


/*  registerUser(): Observable<any>*/

  getAdmin(): Observable<admin> {


    return  this.http.get<admin>(this.url + 'admin', {
      observe: 'body',
      responseType: 'json'
      }
    )
  }



  private log(url: string, data: string) {
    const message = `DownloaderService downloaded "${url}" and got "${data}".`;
    console.log(message)
  }

  private logError(url: string, error: any) {
    const message = `DownloaderService failed to download "${url}"; got error "${error.message}".`;
    console.log(message);
  }


 // private errHandler(){
  //  console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
   // return of(new AdminIsSet(false))
  //}
}
