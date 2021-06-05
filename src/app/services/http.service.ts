import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {tap, catchError} from 'rxjs/operators'

import {AdminIsSet} from '../interfaces/user'
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http:HttpClient) { }

  adminIsSet(): Observable<AdminIsSet> {
    const options = {
      observe: 'body',
      responseType: 'json'
    }


    const url ="http://127.0.0.1:5000/adminInfo";
    console.log("houdsdsdhou");
    return this.http.get<AdminIsSet>(url, {
      observe: 'body',
      responseType: 'json'
    }
    );
    //console.log("houhou");

    //return of(new AdminIsSet(true))
  }

  private log(url: string, data: string) {
    const message = `DownloaderService downloaded "${url}" and got "${data}".`;
    console.log(message)
  }

  private logError(url: string, error: any) {
    const message = `DownloaderService failed to download "${url}"; got error "${error.message}".`;
    console.log(message);
  }

  private errHandler(){
    console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    return of(new AdminIsSet(false))
  }
}
