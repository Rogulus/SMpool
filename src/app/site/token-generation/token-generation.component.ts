import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-token-generation',
  templateUrl: './token-generation.component.html',
  styleUrls: ['./token-generation.component.css']
})
export class TokenGenerationComponent implements OnInit {

  constructor(private http: HttpService) { }

  newToken= '';

  ngOnInit(): void {

  }

  onGenerateClick(event: any){
    event.preventDefault();
    this.newToken = '';
    this.http.getNewUserToken().subscribe(token => {
      this.newToken = token.accessToken + ':::'+ token.username;
    })


  }

}
