/************************************************************
 *                                                          *
 *      Author:     Marek Stastny                           *
 *      Created:    2022                                    *
 *                                                          *
 ************************************************************/

import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {FlashMessagesService} from "angular2-flash-messages";
import {HttpService} from "../../services/http.service";
import {UserRegistrationRes} from "../../interfaces/user/user-registration-res";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm = this.fb.group({
    usernameForm: ['', Validators.minLength(5)],
    nameForm: ['', Validators.required],
    surnameForm: ['', Validators.required],
    emailForm: ['', Validators.email],
    adminTokenForm: ['',[Validators.minLength(6), Validators.maxLength(6)]],
    password: this.fb.group({
      passwordForm: ['', Validators.minLength(6)],
      passwordRewriteForm: ['',Validators.minLength(6)]
    })
  })

  usernameMsg = ''
  nameMsg = '';
  surnameMsg = '';
  emailMsg = '';
  adminTokenMsg = ''
  passwordMsg = ''
  passwordRewriteMsg = ''


  valid = false;
  passwordMatch = false;

  constructor(
    private fb: FormBuilder,
    private flashMessage: FlashMessagesService,
    private http: HttpService,
    public snackBar: MatSnackBar,
    private router: Router){ }

  ngOnInit(): void {
  }

  onRegisterClick() {
    const username = this.registrationForm.get('usernameForm')?.value;
    const adminToken = this.registrationForm.get('adminTokenForm')?.value;
    const password = this.registrationForm.get('password.passwordForm')?.value;
    const Name = this.registrationForm.get('nameForm')?.value;
    const Surname = this.registrationForm.get('surnameForm')?.value;
    const email = this.registrationForm.get('emailForm')?.value;
    const fullName = Name + ' ' + Surname


    this.http.registerPost(username, adminToken, password, fullName, email).pipe(
      catchError((error) => {
          this.snackBar.open('Something bad happened, please try again later.', '',
            {duration: 5000, panelClass: ['my-snack-bar']});
          return Observable.throw(error);
        }
      )).subscribe((response:UserRegistrationRes) => {
          let success = true;
          if(response.alreadyActivated){
            this.flash('Account on this admin token was already activated.')
            success = false;
          }
          if(!response.correctAdminToken){
            this.flash('Invalid admin token.')
            success = false;
          }
          if(!response.uniqueUsername){
            this.flash('This username is already used.')
            success = false;
          }
          if(success){
            this.snackBar.open('Success!','',{duration:3000,panelClass: ['my-snack-bar']});
            this.router.navigate(['login'])
          }
        })
}





usernameChange(){
    if(!this.registrationForm.get("usernameForm")?.valid){
      this.usernameMsg = "Username must be at least 5 characters long."
    }
    else{
      this.usernameMsg = ""
    }
  }

  nameChange(){
    if(!this.registrationForm.get("nameForm")?.valid){
      this.nameMsg = "You must fill this field."
    }
    else{
      this.nameMsg = ""
    }
  }

  surnameChange(){
    if(!this.registrationForm.get("surnameForm")?.valid){
      this.surnameMsg = "You must fill this field."
    }
    else{
      this.surnameMsg = ""
    }
  }

  emailChange(){
    if(!this.registrationForm.get("emailForm")?.valid){
      this.emailMsg = "You must fill this field."
    }
    else{
      this.emailMsg = ""
    }
  }

  adminTokenChange(){
    if(!this.registrationForm.get("adminTokenForm")?.valid){
        this.adminTokenMsg = "Admin token must be exactly 6 characters long."
    }
    else{
      this.adminTokenMsg = ""
    }
  }

  passwordChange(){
    this.passwordMatch = this.passwordsMatch()
    if(this.registrationForm.get('password')?.valid){
      if(!this.passwordMatch){
        this.passwordRewriteMsg = "Password must match"
        return
      }
      else{
        this.passwordRewriteMsg = ""
      }
    }
  }

  passwordFirstChange(){
    if(!this.registrationForm.get("password.passwordForm")?.valid){
      this.passwordMsg = "Password must be at least 6 characters long."
    }
    else{
      this.passwordMsg = ""
    }
  }

  passwordRewriteChange(){
    if(!this.registrationForm.get("password.passwordRewriteForm")?.valid){
      this.passwordRewriteMsg = "Password must be at least 6 characters long."
    }
    else{
      this.passwordRewriteMsg = ""
    }
  }

  passwordsMatch(){
    const password = this.registrationForm.get('password.passwordForm')?.value;
    const repeatedPassword = this.registrationForm.get('password.passwordRewriteForm')?.value;
    return password == repeatedPassword;
  }

  flash(message:string){
    this.flashMessage.show(message,
      {cssClass: 'alert alert-danger text-center', timeout: 5000});
  }



  private  handleErrorWithSnackBar(error: HttpErrorResponse) {
    // if (error.status === 0) {
    //   snackBar.open('Client side error.','',{duration:3000,panelClass: ['my-snack-bar']});
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   snackBar.open('Backend returned code ${error.status}, body was:' + error.error.toString(),'',
    //     {duration:3000,panelClass: ['my-snack-bar']});
    // }
    //info user
   this.somethingBadHappenedPopup()
  }

  private somethingBadHappenedPopup(){
    this.snackBar.open('Something bad happened; please try again later.','',
      {duration:3000,panelClass: ['my-snack-bar']});
  }

}
