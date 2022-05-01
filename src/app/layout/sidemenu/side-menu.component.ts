import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-sidemenu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor(private user: UserService, private http: HttpService) { }

  name = ''
  role = ''

  ngOnInit(): void {
    this.name = this.user.name;
    this.role = this.user.isAdmin? 'Admin' : 'User';
    this.http.sessionCheck().subscribe(res =>{
      this.name = res.user.username;
      this.role = res.user.admin ? 'Admin' : 'User';
      this.user.load(res.user)
      //TODO session check by měl být app.component.ts
    })
  }


}
