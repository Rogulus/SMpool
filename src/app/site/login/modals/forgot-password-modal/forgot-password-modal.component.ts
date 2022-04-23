import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../../services/http.service";
import {MatDialogRef} from "@angular/material/dialog";
import {AdminService} from "../../../../services/admin.service";


@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.css']
})
export class ForgotPasswordModalComponent implements OnInit {

  constructor(private apiService: HttpService, private dialogRef: MatDialogRef<any>, private admin: AdminService) { }

  adminName = ""
  adminEmail = ""

  ngOnInit(): void {
    this.adminName = this.admin.name;
    this.adminEmail = this.admin.email;
  }

  Close(){
    this.dialogRef.close()
  }


}
