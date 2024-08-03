import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeleccionMateriasRoutingModule } from './seleccion-materias-routing.module';
import { SeleccionMateriasComponent } from './seleccion-materias.component';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    SeleccionMateriasComponent
  ],
  imports: [
    CommonModule,
    SeleccionMateriasRoutingModule,
    MaterialModule
  ]
})
export class SeleccionMateriasModule { }
