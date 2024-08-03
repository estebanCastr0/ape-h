import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import { PrincipalRoutingModule } from './principal-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { Dialog2Component } from './dialog2/dialog2.component';
import { Dialog3Component } from './dialog3/dialog3.component';
import { Dialog4Component } from './dialog4/dialog4.component';



@NgModule({
  declarations: [
    PrincipalComponent,
    Dialog2Component,
    Dialog3Component,
    Dialog4Component
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    MaterialModule
  ]
})
export class PrincipalModule { }
