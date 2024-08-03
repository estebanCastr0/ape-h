import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegistrarComponent } from './registrar/registrar.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { RecuperacionComponent } from './recuperacion/recuperacion.component';


@NgModule({
  declarations: [
    RegistrarComponent,
    LoginComponent,
    RecuperacionComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FormsModule,
  ]
})
export class AuthModule { }
