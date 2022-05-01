import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {GeneralUser} from "../../interfaces/general-user";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ForgotPasswordModalComponent} from "../login/modals/forgot-password-modal/forgot-password-modal.component";
import {ConfirmDeleteComponent} from "./modals/confim-delete/confirm-delete.component";
import {catchError} from "rxjs/operators";
import {Observable, pipe} from "rxjs";
import {UserRegistrationRes} from "../../interfaces/user/user-registration-res";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  userForm=this.fb.group({
    usernameForm: ['', [Validators.minLength(5), Validators.required]],
    fullNameForm: [''],
    emailForm: ['', [Validators.email]],
    password: this.fb.group({
      passwordForm: ['', Validators.minLength(6)],
      passwordRepeatForm: ['',Validators.minLength(6)]
    })
  })


  constructor(private fb: FormBuilder, private http: HttpService, private dialog: MatDialog,  private snackBar: MatSnackBar,) { }

    users: GeneralUser[] = [];
    selectedUserIndex = -1;

    editedUserOrigUsername = '';
    editedUser  = <GeneralUser>{};
    newPassword = '';

    //form variables
    passwordMatch = true;
    formUnchanged = true;


    usernameMsg = '';
    fullNameMsg = '';
    emailMsg = '';
    passwordMsg = '';
    passwordRepeatMsg = '';


  ngOnInit(): void {
    this.http.getAllUsers().subscribe(users =>{
      this.users = users;
    })
    this.selectedUserIndex = -1;
  }

  onSelectUser(index: number, user: GeneralUser){
    this.formUnchanged = true;
    this.selectedUserIndex = index;
    this.editedUser = { ...user}; //Spread operator - deep copy
    this.editedUserOrigUsername =  user.username;
    this.userForm.controls['usernameForm'].setValue(user.username);
    this.userForm.controls['fullNameForm'].setValue(user.fullName);
    this.userForm.controls['emailForm'].setValue(user.email);
  }

  onSubmit(user: GeneralUser){
    let newPassSet = this.newPassword != '';
    this.http.putUser(this.editedUser, user.username, newPassSet, this.newPassword)
      .pipe(
        catchError((error) => {
          this.snackBar.open('Something bad happened, please try again later.', '',
            {duration: 5000, panelClass: ['my-snack-bar']});
          return Observable.throw(error);
        }
        ))
      .subscribe(x => {
        this.snackBar.open('Success!','',{duration:3000,panelClass: ['my-snack-bar']});
        this.ngOnInit();
      });


    console.log(this.editedUser);
    console.log(user);

    //poslat hhttp pokud error napsat jinak napsat success a reload
  }

  openDelete(user:GeneralUser) {
    let adminCount = 0;
    if(user.admin){
      this.users.forEach(user => {
        if (user.admin){
          adminCount++;
        }
      })
      if(adminCount==1){
        this.snackBar.open("You can't delete last admin!",'',{duration:5000,panelClass: ['my-snack-bar']});
        return;
      }
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = user;
    dialogConfig.autoFocus = true;
    const ref = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    ref.afterClosed().subscribe(result => {
      if(result){
        this.http.deleteUser(user.username)
          .pipe(
            catchError((error) => {
                this.snackBar.open('Something bad happened, please try again later.', '',
                  {duration: 5000, panelClass: ['my-snack-bar']});
                return Observable.throw(error);
              }
            ))
          .subscribe(x => {
            this.snackBar.open('Success!','',{duration:3000,panelClass: ['my-snack-bar']});
            this.ngOnInit();
          });
      }
    })
  }

  onClose(){
    this.selectedUserIndex = -1;
  }

  onUsernameChange(event:any){
    this.formUnchanged = false;
    this.editedUser.username = event.target.value.toString();
    if(!this.userForm.get("usernameForm")?.valid){
      this.usernameMsg = "Username must be at least 5 characters long."
    }
    else{
      this.usernameMsg = ""
    }
  }

  onFullNameChange(event:any){
    this.formUnchanged = false;
    this.editedUser.fullName = event.target.value.toString();
  }

  onEmailChange(event:any){
    this.formUnchanged = false;
    this.editedUser.email = event.target.value.toString();
    if(!this.userForm.get("emailForm")?.valid){
      this.emailMsg = "This is not valid email address."
    }
    else{
      this.emailMsg = ""
    }
  }

  passwordChange(){
    this.formUnchanged = false;
    this.passwordMatch = this.passwordsMatch()
    if(this.userForm.get('password')?.valid){
      if(!this.passwordMatch){
        this.passwordRepeatMsg = "Password must match"
        return
      }
      else{
        this.passwordRepeatMsg = ""
        this.newPassword = this.userForm.get("password.passwordForm")?.value.toString();//TODO!!!! udelat hash sluzbu a heslo zahashovat a nejak zmenit
      }
    }
  }

  onPasswordChange(event:any){
    this.formUnchanged = false;
    if(!this.userForm.get("password.passwordForm")?.valid){
      this.passwordMsg = "Password must be at least 6 characters long."
    }
    else{
      this.passwordMsg = ""
    }
  }

  onPasswordRepeatChange(event:any){
    this.formUnchanged = false;
      if(!this.userForm.get("password.passwordRepeatForm")?.valid){
        this.passwordRepeatMsg = "Password must be at least 6 characters long."
      }
      else{
        this.passwordRepeatMsg = ""
      }
  }

  onAdminStatusChange(admin: boolean){
    this.formUnchanged = false;
    this.editedUser.admin = admin;
  }

  onActivatedStatusChange(activated: boolean){
    this.formUnchanged = false;
    this.editedUser.activated = activated;
  }

  passwordsMatch(){
    const password = this.userForm.get('password.passwordForm')?.value;
    const repeatedPassword = this.userForm.get('password.passwordRepeatForm')?.value;
    return password == repeatedPassword;
  }
}





