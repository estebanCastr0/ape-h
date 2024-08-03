import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionMateriasComponent } from './seleccion-materias.component';

const routes: Routes = [
  {
    path: '',
    component: SeleccionMateriasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeleccionMateriasRoutingModule { }
