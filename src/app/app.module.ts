import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './layout/public/login/login/login.component';
import { PromedioComponent } from './layout/public/promedio/promedio/promedio.component';
import { CrearcuentaComponent } from './layout/public/login/crearcuenta/crearcuenta.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PromedioComponent,
    CrearcuentaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
