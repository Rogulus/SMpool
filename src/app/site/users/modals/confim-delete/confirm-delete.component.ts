import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GeneralUser} from "../../../../interfaces/general-user";

@Component({
  selector: 'app-confim-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  myData = <GeneralUser>{};
  @Output() submitClicked = new EventEmitter<any>();

  name = '';
  ngOnInit(): void {
    this.myData = this.data;
  }

  Close(){
    this.dialogRef.close(false)
  }

  Delete(){
    this.dialogRef.close(true)
  }
}
