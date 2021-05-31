import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AdminIsSet} from '../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class APIserviceService {

  constructor() { }

  adminIsSet(): Observable<AdminIsSet>{

    return of(new AdminIsSet(false))
  }
}
