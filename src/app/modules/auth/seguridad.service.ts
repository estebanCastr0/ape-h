import { Subject, of } from 'rxjs';
import { Usuario } from './usuario.model';
import { LoginData } from './login-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SeguridadService {

  private token!: string;

  baseUrl = environment.baseUrl;

  seguridadCambio = new Subject<boolean>();

  private usuario: Usuario | null = null;

  obtenerToken(): string{
    return this.token;
  }

  constructor(private router: Router, private http: HttpClient){

  }

  registrarUsuario(usr: Usuario) {
    this.usuario = {
      email: usr.email,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: usr.nombre,
      apellidos: usr.apellidos,
      username: usr.username,
      password: '',
      token: ''
    };

    this.seguridadCambio.next(true);
    this.router.navigate(['/']);
  }

  configurarUsuario(usr: Usuario): void {
    this.usuario = {
      email: usr.email,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: usr.nombre,
      apellidos: usr.apellidos,
      username: usr.username,
      password: '',
      token: ''
    };
  }

  login(loginData: LoginData) {

    /* Borrar cuando haya conexion con el back */
    this.usuario = {
      email: 'test@gmail.com',
      nombre: 'Esteban',
      apellidos: 'Castro',
      token: 'afcwejfjwefweijfwejf',
      password: '123456',
      username: 'Esteban',
      usuarioId: '1'
    };
    this.seguridadCambio.next(true);
    return of(this.usuario)
    /* --------------------------------------------------------------------------*/

    this.http.post<Usuario>(this.baseUrl + 'usuario/login', loginData)
      .subscribe( (response) => {
        console.log('login respuesta', response);

        this.token = response.token;
        this.usuario = {
          email: response.email,
          nombre: response.nombre,
          apellidos: response.apellidos,
          token: response.token,
          password: '',
          username: response.username,
          usuarioId: response.usuarioId
        };
        this.seguridadCambio.next(true);
        this.router.navigate(['/']);
      });
  }

  salirSesion() {
    this.usuario = null;
    this.seguridadCambio.next(false);
    this.router.navigate(['/login']);
  }

  obtenerUsuario() {
    return { ...this.usuario };
  }

  onSesion(){
    return this.usuario != null;
  }
}
