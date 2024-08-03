import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SeguridadService } from '../auth/seguridad.service';

@Component({
  selector: 'app-config-usuario',
  templateUrl: './config-usuario.component.html',
  styleUrls: ['./config-usuario.component.scss']
})
export class ConfigUsuarioComponent {

  constructor(private seguridadService: SeguridadService){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  configurarUsuario(form: NgForm){
    console.log(form);
    this.seguridadService.configurarUsuario({
      email: form.value.email,
      password: form.value.password,
      apellidos: form.value.apellidos,
      nombre: form.value.nombre,
      username: form.value.username,
      usuarioId: '',
      token: ''
    })
  }
}
