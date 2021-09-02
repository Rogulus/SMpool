import { EventEmitter } from '@angular/core';
import {Component, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  @Output() loginEvent = new EventEmitter<void>()
  onLoginClick(event : any){
    event.preventDefault()
    const target = event.target
    const username = target.getElementById('login-username')
    const password = target.getElementById('login-password')
    console.log(username, password)
    //todo volání service ověření jména a emitace jen v případě OK

    this.loginEvent.emit()
  }
}
