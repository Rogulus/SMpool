import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup, FormControl} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm = this.fb.group({
    usernameForm: ['', ],
    emailForm: ['', ],
    passwordForm: ['', ]
  })
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onRegisterClick(event: any){
    const username = this.registrationForm.get('usernameForm')?.value;
    const email = this.registrationForm.get('emailForm')?.value;
    const password = this.registrationForm.get('passwordForm')?.value;
    console.log(username, email, password)
    /*todo ověřeni */
  }
}
