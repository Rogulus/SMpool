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


import { RouterModule, Routes } from '@angular/router';
import { AdminCreatorComponent } from './site/admin-creator/admin-creator.component';


//http service
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MatDialog} from "@angular/material/dialog";
import { ForgotPasswordModalComponent } from './site/login/modals/forgot-password-modal/forgot-password-modal.component';
import {MatButtonModule} from "@angular/material/button";
import {FlashMessagesModule} from "angular2-flash-messages";

import {AuthGuard} from "./services/auth.guard";
import { MainComponent } from './layout/main/main.component';
import {AuthService} from "./services/auth.service";
import {AdminRegistrationGuard} from "./services/admin-registration.guard";


// import { registerContentQuery } from '@angular/core/src/render3/instructions';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component : RegisterComponent},
  { path: 'registerAdmin', component : AdminCreatorComponent, canActivate: [AdminRegistrationGuard]},
  { path: 'dashboard', component: MainComponent, canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent},
      { path: 'charts', component : ChartsComponent},
      { path: 'forms', component : FormsComponent},
      { path: 'tables', component : TablesComponent},
    ]},
/*  { path: '',
    redirectTo:'/login',
    pathMatch: 'full'
  },*/
  {path: '**',
  redirectTo:'/login'}

];


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
    MainComponent
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
    FlashMessagesModule.forRoot()
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



