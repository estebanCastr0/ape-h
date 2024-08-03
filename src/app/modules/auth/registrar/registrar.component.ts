import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit{

  constructor(private seguridadService: SeguridadService){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  registrarUsuario(form: NgForm){
    console.log(form);
    this.seguridadService.registrarUsuario({
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
