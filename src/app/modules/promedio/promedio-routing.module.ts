import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromedioComponent } from './promedio.component';



const routes: Routes = [
  {
    path: '',
    component: PromedioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromedioRouting { }
