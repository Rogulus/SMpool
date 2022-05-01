import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpService} from "../../services/http.service";
import {Router} from "@angular/router";
import {map, tap} from "rxjs/operators";
import {AdminRegistration, AdminRegistrationInfo} from "../../interfaces/admin/admin-registration";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-admin-creator',
  templateUrl: './admin-creator.component.html',
  styleUrls: ['./admin-creator.component.css']
})
export class AdminCreatorComponent implements OnInit {

  adminForm=this.fb.group({
    usernameForm: ['', [Validators.minLength(5), Validators.required]],
    nameForm: ['', Validators.required],
    surnameForm: ['', Validators.required],
    emailForm: ['', Validators.email],
    password: this.fb.group({
      passwordForm: ['', Validators.minLength(6)],
      passwordRepeatForm: ['',Validators.minLength(6)]
    })
  })

  passwordMatch = false;

  usernameMsg = '';
  nameMsg = '';
  surnameMsg = '';
  emailMsg = '';
  passwordMsg = '';
  passwordRepeatMsg = '';

  constructor(private fb: FormBuilder, private http: HttpService, private router: Router, private auth: AuthService,
              private userService: UserService, private adminService: AdminService) { }

  ngOnInit(): void {
    console.log('create Admin')
  }

  usernameChange(){
    if(!this.adminForm.get("usernameForm")?.valid){
      this.usernameMsg = "Username must be at least 5 characters long."
    }
    else{
      this.usernameMsg = ""
    }
  }

  nameChange(){
    if(!this.adminForm.get("nameForm")?.valid){
      this.nameMsg = "You must fill this field."
    }
    else{
      this.nameMsg = ""
    }
  }

  surnameChange(){
    if(!this.adminForm.get("surnameForm")?.valid){
      this.surnameMsg = "You must fill this field."
    }
    else{
      this.surnameMsg = ""
    }
  }

  emailChange(){
    if(!this.adminForm.get("emailForm")?.valid){
      this.emailMsg = "You must fill this field."
    }
    else{
      this.emailMsg = ""
    }
  }

  passwordChange(){
    this.passwordMatch = this.passwordsMatch()
    if(this.adminForm.get('password')?.valid){
      if(!this.passwordMatch){
        this.passwordRepeatMsg = "Password must match"
        return
      }
      else{
        this.passwordRepeatMsg = ""
      }
    }
  }

  passwordFirstChange(){
    if(!this.adminForm.get("password.passwordForm")?.valid){
      this.passwordMsg = "Password must be at least 6 characters long."
    }
    else{
      this.passwordMsg = ""
    }
  }

  passwordRepeatChange(){
    if(!this.adminForm.get("password.passwordRewriteForm")?.valid){
      this.passwordRepeatMsg = "Password must be at least 6 characters long."
    }
    else{
      this.passwordRepeatMsg = ""
    }
  }

  passwordsMatch(){
    const password = this.adminForm.get('password.passwordForm')?.value;
    const repeatedPassword = this.adminForm.get('password.passwordRepeatForm')?.value;
    return password == repeatedPassword;
  }


  @Output() loginEvent = new EventEmitter<void>()
  onRegisterClick(){
    const username = this.adminForm.get('usernameForm')?.value;
    const name = this.adminForm.get('nameForm')?.value;
    const surname = this.adminForm.get('surnameForm')?.value;
    const email = this.adminForm.get('emailForm')?.value;
    const password = this.adminForm.get('password.passwordForm')?.value;
    const fullName = name + ' ' + surname

    this.http.registerAdmin(username, fullName, email, password).subscribe( x => {
      if(x.adminRegistrationInfo.success){
            // this.auth.login();
            // this.userService.load(x.user);
            // this.adminService.load(x.user.fullName, x.user.email)
            this.router.navigate(['/login'])
          }
      })
    //todo a info about admin dodělat checkbox keep me signed in co když se nepovede?
  }

}
