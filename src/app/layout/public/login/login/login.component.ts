import { Component } from '@angular/core';
import {ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  err: string ='';
  @ViewChild('elmailInput') elmailInput: ElementRef | undefined;
  @ViewChild('passwordInput') passwordInput: ElementRef | undefined;

  login() {
    if (this.elmailInput && this.passwordInput) {
      const emailValue = this.elmailInput.nativeElement.value.trim();
      const passwordValue = this.passwordInput.nativeElement.value.trim();
  
      if (emailValue === '' || passwordValue === '') {
        this.err = "Los datos no están ingresados";
      } else {
        this.err = "";
        if(emailValue === 'jnavas@unbosque.edu.co' && passwordValue === '123'){
          this.err ="Datos correctos";
        }else{
          this.err="Email o contraseña incorrecta"
        }
      }
      
      console.log("test");
      console.log('Email:', emailValue);
      console.log('Password:', passwordValue);
    }
  }
}
