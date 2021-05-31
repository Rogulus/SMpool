import { Component, OnInit } from '@angular/core';
import {APIserviceService} from "./services/apiservice.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SMpool';
  userIsLogged = false;
  adminIsSet = false;

  constructor(private apiService: APIserviceService) { }

  ngOnInit() {
    this.apiService.adminIsSet().subscribe(an => this.adminIsSet = an.isSet);
  }

  loginPassed(){
     this.userIsLogged = true;
  }

  adminCreated(){
    this.adminIsSet=true;
    this.userIsLogged = true;
  }

}
