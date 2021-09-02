import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../../services/http.service";
import {MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.css']
})
export class ForgotPasswordModalComponent implements OnInit {

  constructor(private apiService: HttpService, private dialogRef: MatDialogRef<any>) { }

  adminName = ""
  adminEmail = ""

  ngOnInit(): void {
    this.apiService.getAdmin().subscribe(admin => {this.adminName=admin.admin_name;
    this.adminEmail = admin.admin_email})
  }

  Close(){
    this.dialogRef.close()
  }


}
