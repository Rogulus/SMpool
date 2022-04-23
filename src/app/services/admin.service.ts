import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";

export class Admin {
  name: string;
  email: string;


  constructor(name:string, email: string) {
    this.name = name;
    this.email = email
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
/*  Stores info about admin.*/
  admin: any
  constructor(private api: HttpService) {
   /* this.api.getAdmin().subscribe(admin => {
      if(admin.admin_exists){
        this.load(admin.admin_name, admin.admin_email)
      }
    })*/
  }

  load(name:string, email: string){
    if (this.admin == null){
      this.admin = new Admin(name, email)
    }
  }

  get name(){
    return this.admin? this.admin.name : ''
  }

  get email(){
    return this.admin? this.admin.email: ''
  }

  get exist(){
    return !!this.admin
  }

}
