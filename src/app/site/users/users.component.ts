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


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private http: HttpService, private dialog: MatDialog,  private snackBar: MatSnackBar,) { }

    users: GeneralUser[] = [];
    selectedUserIndex = -1;

    editedUserOrigUsername = '';
    editedUser  = <GeneralUser>{};
    newPassword = '';

  ngOnInit(): void {
    this.http.getAllUsers().subscribe(users =>{
      this.users = users;
    })
  }

  onSelectUser(index: number, user: GeneralUser){
    this.selectedUserIndex = index;
    this.editedUser = { ...user}; //Spread operator - deep copy
    this.editedUserOrigUsername =  user.username;
  }

  onSubmit(user: GeneralUser){
    //zkontrolovat hesla

    console.log(this.editedUser);
    console.log(user);

    //poslat hhttp pokud error napsat jinak napsat success a reload
  }

  openDelete(user:GeneralUser) {
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
    this.editedUser.username = event.target.value.toString();
  }

  onFullNameChange(event:any){
    this.editedUser.fullName = event.target.value.toString();
  }

  onEmailChange(event:any){
    this.editedUser.email = event.target.value.toString();
  }

  onPasswordChange(event:any){
    this.newPassword = event.target.value.toString();//TODO!!!! udelat hash sluzbu a heslo zahashovat a nejak zmenit
  }

  onAdminStatusChange(admin: boolean){
    this.editedUser.admin = admin;
  }

  onActivatedStatusChange(activated: boolean){
    this.editedUser.activated = activated;
  }
}





