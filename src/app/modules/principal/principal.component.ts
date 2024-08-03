import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dialog1Component } from './dialog1/dialog1.component';
import { Dialog2Component } from './dialog2/dialog2.component';
import { Dialog3Component } from './dialog3/dialog3.component';
import { Dialog4Component } from './dialog4/dialog4.component';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {
  data: any = []

  constructor(public dialog: MatDialog) { }

  // Método para abrir el modal

  cargarHorarios() {
		const dialogRef = this.dialog.open(Dialog1Component);

		dialogRef.afterClosed().subscribe((result: any) => {
			console.log('Modal cerrado:', result);
		});
	}

  cargarHorariosElectivas() {
		const dialogRef = this.dialog.open(Dialog2Component);

		dialogRef.afterClosed().subscribe((result: any) => {
			console.log('Modal cerrado:', result);
		});
	}

  verHorarios() {
		const dialogRef = this.dialog.open(Dialog3Component);

		dialogRef.afterClosed().subscribe((result: any) => {
			console.log('Modal cerrado:', result);
		});
	}

  verHorariosElectivas() {
		const dialogRef = this.dialog.open(Dialog4Component);

		dialogRef.afterClosed().subscribe((result: any) => {
			console.log('Modal cerrado:', result);
		});
	}
}
