import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { SeguridadService } from '../../../modules/auth/seguridad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-lista',
  templateUrl: './menu-lista.component.html',
  styleUrls: ['./menu-lista.component.scss']
})
export class MenuListaComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();

  estadoUsuario!: Boolean;
  usuarioSubscription!: Subscription;

  constructor(private seguridadService: SeguridadService) { }

  ngOnInit(): void {
    this.usuarioSubscription = this.seguridadService.seguridadCambio.subscribe( status =>{
      this.estadoUsuario = status;
    });
  }

  onCerrarMenu(){
    this.menuToggle.emit();
  }

  terminarSesionMenu(){
    this.onCerrarMenu();
    this.seguridadService.salirSesion();
  }

  ngOnDestroy(){
    this.usuarioSubscription.unsubscribe();
  }

}
