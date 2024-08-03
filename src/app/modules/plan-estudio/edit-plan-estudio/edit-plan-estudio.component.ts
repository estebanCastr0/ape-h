import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-plan-estudio',
  templateUrl: './edit-plan-estudio.component.html',
  styleUrls: ['./edit-plan-estudio.component.scss']
})
export class EditPlanEstudioComponent {

  estados = [
    { value: 1, label: 'Cursado' },
    { value: 2, label: 'Disponible' },
    { value: 3, label: 'Pendiente'},
    { value: 4, label: 'Por Matricular' }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditPlanEstudioComponent>
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
