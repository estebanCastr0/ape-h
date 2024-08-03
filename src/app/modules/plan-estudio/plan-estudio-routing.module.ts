import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanEstudioComponent } from './plan-estudio.component';

const routes: Routes = [
  {
    path: '',
    component: PlanEstudioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanEstudioRoutingModule { }
