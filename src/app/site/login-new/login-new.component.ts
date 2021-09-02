import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Form, FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {Validators} from "@angular/forms";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ForgotPasswordModalComponent} from "./modals/forgot-password-modal/forgot-password-modal.component";
import {AuthService} from "../../services/auth.service";
import {UserLoginRes} from '../../interfaces/user/user-login-res'
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-login-new',
  templateUrl: './login-new.component.html',
  styleUrls: ['./login-new.component.css']
})
export class LoginNewComponent implements OnInit {

  /*  loginForm = new FormGroup({
      nameForm: new FormControl('e.g. John'),
      passwordForm: new FormControl(''),
      counterForm: new FormControl('')
    });*/

  loginForm = this.fb.group({
    nameForm: ['', [Validators.minLength(5), Validators.required]],
    passwordForm: ['', Validators.minLength(6)]
  })
  valid = false;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private auth: AuthService,
              private flashMessage: FlashMessagesService) {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    this.dialog.open(ForgotPasswordModalComponent, dialogConfig);
  }


  ngOnInit(): void {
    /*    this.myForm = this.fb.group({
          username: '',
          password: ''
        })

        this.myForm.valueChanges.subscribe(console.log())*/
  }

  /*  upCount() {
      this.counter ++;
      this.loginForm.patchValue({counterForm:this.counter})
    }

    downCount() {
      this.counter --;
      this.loginForm.patchValue({counterForm:this.counter})
    }

    resetCounter() {
      this.counter = 0;
      this.loginForm.patchValue({counterForm:this.counter})
    }*/

  @Output() loginEvent = new EventEmitter<void>()

  loginSubmit(event: any) {
    event.preventDefault()
    const username = this.loginForm.get('nameForm')?.value
    const password = this.loginForm.get('passwordForm')?.value
    console.log(username, password)

    this.auth.getUserInfo(username, password).subscribe((user: UserLoginRes) => {
      if (!user.exists) {
        this.showUsernameIncorrect();
      } else if(!user.success){
        this.showPasswordIncorrect()
      }
      else{
        this.loginEvent.emit()
      }
    })



    /*this.loginEvent.emit()*/
  }

  developmentLogin(event: any) {
    this.loginEvent.emit()
  }

  showUsernameIncorrect() {
    this.flashMessage.show('This username does not exist.', {cssClass: 'alert alert-danger ', timeout: 5000});
  }

  showPasswordIncorrect() {
    this.flashMessage.show('Incorrect password.', {cssClass: 'alert alert-danger text-center', timeout: 5000});
  }
}
