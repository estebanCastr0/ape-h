import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromedioComponent } from './promedio.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PromedioRouting } from './promedio-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PromedioComponent
  ],
  imports: [
    CommonModule,
    PromedioRouting,
    MaterialModule,
    FormsModule
  ]
})
export class PromedioModule { }
