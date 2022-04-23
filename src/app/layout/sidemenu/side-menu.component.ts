import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-sidemenu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor(private user: UserService) { }

  name = ''
  role = ''

  ngOnInit(): void {
    this.name = this.user.name;
    this.role = this.user.isAdmin? 'Admin' : 'User';
  }


}
