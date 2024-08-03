import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog4',
  templateUrl: './dialog4.component.html',
  styleUrls: ['./dialog4.component.scss']
})
export class Dialog4Component {
  data: any[] = [];

  constructor(private dialogRef: MatDialogRef<Dialog4Component>) { }

  ngOnInit(): void {
    this.data = [
      { nombreMateria: 'Cine, literatura y sociedad', dia: 'Lunes', horaInicio: '08:00', horaFin: '10:00' },
      { nombreMateria: 'Astronomia', dia: 'Martes', horaInicio: '09:00', horaFin: '11:00' },
      { nombreMateria: 'Python desde cero', dia: 'Miércoles', horaInicio: '10:00', horaFin: '12:00' },

    ];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

