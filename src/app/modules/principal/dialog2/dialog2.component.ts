import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MediaService } from 'src/app/media.service';

@Component({
  selector: 'app-dialog2',
  templateUrl: './dialog2.component.html',
  styleUrls: ['./dialog2.component.scss']
})
export class Dialog2Component {
  isFileValid = true;
  fileName = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private mediaService: MediaService, private dialogRef: MatDialogRef<Dialog2Component>) {

  }

  upload(event: any) {
    const file = event.target.files[0];

    if (file && file.name.endsWith('.txt')) {
      this.isFileValid = true;
      this.fileName = file.name;
      const formData = new FormData();

      this.mediaService.uploadFile(formData)
        .subscribe((response: any) =>{
          console.log('Archivo cargado:', this.fileName);
        })
    } else {
      this.isFileValid = false;
      this.fileName = '';
      console.log('Archivo invalido');
    }

  }

  guardarHorario() {
    console.log('Guardando edición...');
    console.log('Nombre del archivo:', this.fileName);
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

