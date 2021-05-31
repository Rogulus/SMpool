import { EventEmitter } from '@angular/core';
import {Component, OnInit, Output} from '@angular/core';

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
  onLoginClick(){
    //todo volání service ověření jména a emitace jen v případě OK
    this.loginEvent.emit()
  }
}
