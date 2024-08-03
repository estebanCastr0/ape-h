import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SeguridadService } from '../seguridad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private seguridadService: SeguridadService, private router: Router) {}

  ngOnInit(): void {
  }

  loginUsuario(form: NgForm){
    this.seguridadService.login({
      email: form.value.email,
      password: form.value.password
    }).subscribe(res => {
      this.router.navigateByUrl('/principal');
    })
  }

}
