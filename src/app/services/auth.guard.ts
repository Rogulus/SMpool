import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  CanLoad,
  RouterModule, Router
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate /*, CanLoad*/{

  constructor(private  auth: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
/*    if(this.auth.userLogged2){
      console.log('auth guard ok')
      return true;
    }
    else{
      console.log('auth guard badd')
      this.router.navigate(['/login']);
      return false;
    }*/
    return this.auth.userLogged().pipe(tap(x => {if(!x){this.router.navigate(['/login'])}}))


  }

/*  canLoad(route: Route,
          segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  }*/

}
