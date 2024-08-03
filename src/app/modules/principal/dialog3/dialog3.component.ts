import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog3',
  templateUrl: './dialog3.component.html',
  styleUrls: ['./dialog3.component.scss']
})
export class Dialog3Component {

  data: any[] = [];

  constructor(private dialogRef: MatDialogRef<Dialog3Component>) { }

  ngOnInit(): void {
    this.data = [
      { nombreMateria: 'Ingenieria de software 2', dia: 'Lunes', horaInicio: '08:00', horaFin: '10:00' },
      { nombreMateria: 'Complejidada Algoritmica', dia: 'Martes', horaInicio: '09:00', horaFin: '11:00' },
      { nombreMateria: 'Programacion 1', dia: 'Miércoles', horaInicio: '10:00', horaFin: '12:00' },

    ];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
