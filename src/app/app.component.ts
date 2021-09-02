import { Component, OnInit } from '@angular/core';
import {HttpService} from "./services/http.service";
import {Admin} from "./Objects/Admin"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SMpool';
  userIsLogged = false;
  admin = new Admin()

  constructor(private apiService: HttpService) { }

  ngOnInit() {
    this.apiService.getAdmin().subscribe(admin => {this.admin.admin_exists = admin.admin_exists;
      this.admin.name = admin.admin_name });
  }

  loginPassed(){
     this.userIsLogged = true;
  }

  adminCreated(){
    this.admin.admin_exists=true;
    this.userIsLogged = true;
  }
}
