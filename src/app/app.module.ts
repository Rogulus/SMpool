import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideMenuComponent } from './layout/sidemenu/side-menu.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './site/home/home.component';
import { ChartsComponent } from './site/charts/charts.component';
import { FormsComponent } from './site/forms/forms.component';
import { LoginComponent } from './site/login/login.component';
import { RegisterComponent } from './site/register/register.component';
import { TablesComponent } from './site/tables/tables.component';


import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialog} from "@angular/material/dialog";

import { IMqttServiceOptions, MqttModule } from "ngx-mqtt";
import { environment as env } from '../environments/environment';


import { RouterModule, Routes } from '@angular/router';
import { AdminCreatorComponent } from './site/admin-creator/admin-creator.component';


//http service
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ForgotPasswordModalComponent } from './site/login/modals/forgot-password-modal/forgot-password-modal.component';
import {MatButtonModule} from "@angular/material/button";
import {FlashMessagesModule} from "angular2-flash-messages";

import {AuthGuard} from "./services/auth.guard";
import { MainComponent } from './layout/main/main.component';
import {AuthService} from "./services/auth.service";
import {AdminRegistrationGuard} from "./services/admin-registration.guard";
import { TokenGenerationComponent } from './site/token-generation/token-generation.component';
import { UsersComponent } from './site/users/users.component';
import { ConfirmDeleteComponent } from './site/users/modals/confim-delete/confirm-delete.component';


// import { registerContentQuery } from '@angular/core/src/render3/instructions';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'registerAdmin', component: AdminCreatorComponent, canActivate: [AdminRegistrationGuard]},
  { path: 'dashboard', component: MainComponent, canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent},
      { path: 'settings', component: FormsComponent},
      { path: 'users-overview', component: UsersComponent},
      { path: 'token-generation', component: TokenGenerationComponent},

      { path: 'tables', component: TablesComponent},
      { path: 'charts', component: ChartsComponent}
    ]},
/*  { path: '',
    redirectTo:'/login',
    pathMatch: 'full'
  },*/
  {path: '**',
  redirectTo:'/login'}

];


const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: env.mqtt.server,
  port: env.mqtt.port,
  protocol: (env.mqtt.protocol === "wss") ? "wss" : "ws",
  path: '/mqtt',
  username:'Smpool',
  password:'Smpoolpass1',

};


@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ChartsComponent,
    FormsComponent,
    LoginComponent,
    RegisterComponent,
    TablesComponent,
    AdminCreatorComponent,
    LoginComponent,
    ForgotPasswordModalComponent,
    MainComponent,
    TokenGenerationComponent,
    UsersComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    FlashMessagesModule.forRoot(),
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [AuthGuard,
    {provide: HTTP_INTERCEPTORS,
      useClass: AuthService,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [ForgotPasswordModalComponent]
})
export class AppModule { }



