import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-admin-creator',
  templateUrl: './admin-creator.component.html',
  styleUrls: ['./admin-creator.component.css']
})
export class AdminCreatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() loginEvent = new EventEmitter<void>()
  onRegisterClick(){
    //todo volání service ověření jména a emitace jen v případě OK
    this.loginEvent.emit()
  }

}
