import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Form, FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {Validators} from "@angular/forms";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ForgotPasswordModalComponent} from "./modals/forgot-password-modal/forgot-password-modal.component";
import {AuthService} from "../../services/auth.service";
import {UserLoginRes} from '../../interfaces/user/user-login-res'
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {connectableObservableDescriptor} from "rxjs/internal/observable/ConnectableObservable";

@Component({
  selector: 'app-login-new',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    nameForm: ['', Validators.minLength(5)],
    passwordForm: ['', Validators.minLength(6)]
  })

  valid = false;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private auth: AuthService,
              private flashMessage: FlashMessagesService, private router: Router, private user:UserService) {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    this.dialog.open(ForgotPasswordModalComponent, dialogConfig);
  }


  ngOnInit(): void {
    this.auth.userLogged().subscribe(x => {
      if(x){
        console.log('login init')
        this.router.navigate(['/dashboard/home'])
      }
    })
/*
    if (this.auth.userLogged){
      this.router.navigate(['/dashboard/home'])
    }*/
  }


  loginSubmit(event: any) {
    event.preventDefault()
    const username = this.loginForm.get('nameForm')?.value
    const password = this.loginForm.get('passwordForm')?.value
    let keepSigned = (document.getElementById('register-agree') as HTMLInputElement).checked;

    this.auth.getUserInfo(username, password, keepSigned).subscribe(user => {
      if (!user.requestInfo.exists) {
        this.flashMessage.show('This username does not exist.',
          {cssClass: 'alert alert-danger text-center', timeout: 5000});
      } else if(!user.requestInfo.success){
        this.flashMessage.show('Incorrect password.',
          {cssClass: 'alert alert-danger text-center', timeout: 5000});
      }
      else{
        //success
        this.router.navigate(['dashboard/home'])
      }
    })
  }


  developmentLogin(event: any) {
    let keepSigned = (document.getElementById('register-agree') as HTMLInputElement).checked;
    this.auth.getUserInfo('Marek', '123456', keepSigned).subscribe((user: UserLoginRes) => {
      if (!user.requestInfo.exists) {
        this.flashMessage.show('This username does not exist.',
          {cssClass: 'alert alert-danger text-center', timeout: 5000});
      } else if (!user.requestInfo.success) {
        this.flashMessage.show('Incorrect password.',
          {cssClass: 'alert alert-danger text-center', timeout: 5000});
      } else {
        //success
        this.router.navigate(['dashboard/home'])
      }
    })
  }
}
