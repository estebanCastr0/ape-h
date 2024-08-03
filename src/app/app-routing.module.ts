import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { SeguridadRouter } from './modules/auth/seguridad.router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: ()=> import('./modules/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: 'principal',
    loadChildren: ()=> import('./modules/principal/principal.module').then(m=>m.PrincipalModule),
    // canActivate: [SeguridadRouter]
  },
  {
    path: 'plan-estudio',
    loadChildren: ()=> import('./modules/plan-estudio/plan-estudio.module').then(m=>m.PlanEstudioModule),
    // canActivate: [SeguridadRouter]
  },
  {
    path: 'seleccion-materias',
    loadChildren: ()=> import('./modules/seleccion-materias/seleccion-materias.module').then(m=>m.SeleccionMateriasModule),
    // canActivate: [SeguridadRouter]
  },
  {
    path: 'promedio',
    loadChildren: ()=> import('./modules/promedio/promedio.module').then(m=>m.PromedioModule),
    // canActivate: [SeguridadRouter]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SeguridadRouter]
})
export class AppRoutingModule {}
