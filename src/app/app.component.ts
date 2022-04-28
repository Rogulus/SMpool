import { Component, OnInit } from '@angular/core';
import {HttpService} from "./services/http.service";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {AdminService} from "./services/admin.service";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SMpool';

  constructor(private apiService: HttpService, private auth: AuthService, private router: Router,
              private adminService: AdminService, private userService: UserService) { }

  ngOnInit() {
/*    if (!this.adminService.exist) {
      this.router.navigate(['/registerAdmin'])
      return
    }*/

    this.apiService.getAdmin().subscribe(admin => {
      console.log(admin);
      if (admin.adminExists) {
        this.adminService.load(admin.fullName, admin.email)
      } else {
        this.router.navigate(['/registerAdmin'])
        return
      }
      this.auth.userLogged().subscribe(logged => {
        if (!logged) {
          console.log('NENI LOGED')
          this.router.navigate(['/login'])
        }
        else{
          this.userService.refresh()
          console.log('tady by mela byt veskere load dat, ktera jsou potreba, ne dashboard a tak to si komponenty asi zaridi samotne')
        }
      })

    })
  }
}

//todo jestli je clovek logged in, tak load vsechny data ze serveru!
