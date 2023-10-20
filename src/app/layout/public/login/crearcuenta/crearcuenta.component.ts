import { Component } from '@angular/core';
import {ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './crearcuenta.component.html',
  styleUrls: ['./crearcuenta.component.css']
})
export class CrearcuentaComponent {
  err: string ='';
  @ViewChild('elmailInput') elmailInput: ElementRef | undefined;
  @ViewChild('userInput') userInput: ElementRef | undefined;
  @ViewChild('passwordInput') passwordInput: ElementRef | undefined;
  @ViewChild('password1Input') password1Input: ElementRef | undefined;
  

  login() {
    if (this.elmailInput && this.passwordInput && this.userInput && this.password1Input) {
      const emailValue = this.elmailInput.nativeElement.value.trim();
      const userValue = this.userInput.nativeElement.value.trim();
      const passwordValue = this.passwordInput.nativeElement.value.trim();
      const password1Value = this.password1Input.nativeElement.value.trim();
  
      this.err = "";
      if (emailValue === '' || passwordValue === '' || userValue === '' || password1Value === '') {
        this.err = "Los datos no están ingresados";
      } else {
        if(passwordValue!==password1Value){
          this.err="La contraseña no se repite"
        }
        
      }
      
      console.log("test");
      console.log('Email:', emailValue);
      console.log('Usuario:',userValue)
      console.log('Password:', passwordValue);
      console.log('Password1:', password1Value);
    }
  }
}