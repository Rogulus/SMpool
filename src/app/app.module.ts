import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidemenuComponent } from './layout/sidemenu/sidemenu.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './site/home/home.component';
import { ChartsComponent } from './site/charts/charts.component';
import { FormsComponent } from './site/forms/forms.component';
import { LoginComponent } from './site/login/login.component';
import { RegisterComponent } from './site/register/register.component';
import { TablesComponent } from './site/tables/tables.component';




import { RouterModule, Routes } from '@angular/router';
import { AdminCreatorComponent } from './site/admin-creator/admin-creator.component';

// import { registerContentQuery } from '@angular/core/src/render3/instructions';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'register', component : RegisterComponent},
  { path: 'charts', component : ChartsComponent},
  { path: 'forms', component : FormsComponent},
  { path: 'tables', component : TablesComponent},
  { path: '',
    redirectTo:'/home',
    pathMatch:'full'
  }

];


@NgModule({
  declarations: [
    AppComponent,
    SidemenuComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ChartsComponent,
    FormsComponent,
    LoginComponent,
    RegisterComponent,
    TablesComponent,
    AdminCreatorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



