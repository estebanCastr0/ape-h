import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanEstudioRoutingModule } from './plan-estudio-routing.module';
import { PlanEstudioComponent } from './plan-estudio.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { EditPlanEstudioComponent } from './edit-plan-estudio/edit-plan-estudio.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PlanEstudioComponent,
    EditPlanEstudioComponent
  ],
  imports: [
    CommonModule,
    PlanEstudioRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class PlanEstudioModule { }
