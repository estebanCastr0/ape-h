import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario.component';
import { FormsModule } from '@angular/forms';


import { InicioComponent } from './inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BarraComponent } from './shared/navegacion/barra/barra.component';
import { MenuListaComponent } from './shared/navegacion/menu-lista/menu-lista.component';

import { MAT_DATE_LOCALE } from '@angular/material/core';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SeguridadInterceptor } from './modules/auth/seguridad-interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    InicioComponent,
    BarraComponent,
    MenuListaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SeguridadInterceptor, multi: true },

    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule {}
