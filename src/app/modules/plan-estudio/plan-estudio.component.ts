import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPlanEstudioComponent } from './edit-plan-estudio/edit-plan-estudio.component';
import { MediaService } from 'src/app/media.service';
import * as XLSX from 'xlsx';

type AOA = any[][];

interface Course {
  idCurso: number;
  nombre: string;
  creditos: number;
  estado: number;
  idCursoRequisito: number | null;
}

interface Semester {
  idSemestre: number;
  nombre: string;
  cursos: Course[];
}

@Component({
  selector: 'app-plan-estudio',
  templateUrl: './plan-estudio.component.html',
  styleUrls: ['./plan-estudio.component.scss'],
})
export class PlanEstudioComponent {
  isFileValid = true;
  fileName = '';
  data: Semester[] = [];

  data2: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileNames: string = 'SheetJS.xlsx';
  semesterData: string[] = []; // Array to hold data for each semester
  columns: string[] = [];

  selectedCourses: any[] = [];

  constructor(
    private dialog: MatDialog,
    private mediaService: MediaService
  ) { }

  getCurso(semestre: any, index: number) {
    return semestre.cursos[index];
  }

  generarRango(max: number) {
    return Array.from({ length: max }, (_, i) => i);
  }

  maxCursos() {
    return Math.max(...this.data.map((semestre: any) => semestre.cursos.length));
  }

  seleccionarCurso(curso: any) {
    const dialogRef = this.dialog.open(EditPlanEstudioComponent, {
      data: curso,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('Modal cerrado:', result);
    });
  }

  upload(event: any) {
    const file = event.target.files[0];

    if (file && file.name.endsWith('.xlsx')) {
      this.isFileValid = true;
      this.fileName = file.name;
      const formData = new FormData();

      const target: DataTransfer = <DataTransfer>(event.target);
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        this.data2 = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

        // Initialize data array with empty semesters
        this.data = Array.from({ length: 9 }, (_, i) => ({
          idSemestre: i + 1,
          nombre: 'Semestre ' + (i + 1),
          cursos: [],
        }));

        for (let i = 0; i < this.data2.length; i += 3) {
          for (let j = 0; j < this.data2[i].length; j += 3) {
            let currentBlock = '';
            for (let k = i; k < i + 3; k++) {
              for (let l = j; l < j + 3; l++) {
                if (this.data2[k] && this.data2[k][l]) {
                  currentBlock += this.data2[k][l] + '-';
                }
              }
            }
            if (currentBlock.trim().length > 0) {
              const semesterIndex = Math.floor(j / 3); // Calculate semester index
              // Push the extracted courses into the respective semester
              const datacl = currentBlock.split("-");
              if (datacl.length === 5){
                datacl.unshift("0.0");  
              }
              const estado = this.getEstado(datacl[2]); // Get estado based on class name
              this.data[semesterIndex].cursos.push({
                idCurso: parseInt(datacl[3]),
                nombre: datacl[4],
                creditos: parseInt(datacl[1]),
                estado: estado,
                idCursoRequisito: null,
              });
            }
          }
        }

        // Generate columns
        this.columns = this.data.map((semestre: any) => semestre.nombre);
      };
      reader.readAsBinaryString(target.files[0]);

      this.mediaService.uploadFile(formData)
        .subscribe((response: any) => {
          console.log('Archivo cargado:', this.fileName);
        });
    } else {
      this.isFileValid = false;
      this.fileName = '';
      console.log('Archivo invalido');
    }
  }

  guardarEdicion() {
	console.log('Guardando edición...');
	console.log('Nombre del archivo:', this.fileName);
  
	// Filter the data to include only selected courses
	const selectedCoursesData = this.data.reduce((acc: Course[], semester: Semester) => {
	  semester.cursos.forEach((curso: Course) => {
		if (this.selectedCourses.includes(curso)) {
		  acc.push(curso);
		}
	  });
	  return acc;
	}, []);
  
	// Generate CSV data
	const csvData = this.generateCSV(selectedCoursesData);
  
	// Create a blob with the CSV data
	const blob = new Blob([csvData], { type: 'text/csv' });
  
	// Create a download link
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'cursos.csv';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	window.URL.revokeObjectURL(url);
  }
  
  // Function to generate CSV data from selected courses
  generateCSV(courses: Course[]): string {
	let csv = 'ID Curso,Nombre,Créditos,Estado,ID Curso Requisito\n';
  
	courses.forEach(curso => {
	  csv += `${curso.idCurso},"${curso.nombre}",${curso.creditos},${curso.estado},${curso.idCursoRequisito || ''}\n`;
	});
  
	return csv;
  }
  

  // Function to determine estado based on class name
  getEstado(className: string): number {
    if (className.includes("A")) {
      return 1;
    } else if (className.includes("C")) {
      return 2;
    } else if (className.includes("P")) {
      return 3;
    } else if (className.includes("M")) {
      return 4;
    } else {
      return 0;
    }
  }

  // Inside your component class
  addToSelectedCourses(curso: any) {
    this.selectedCourses.push(curso);
  }

  removeFromSelectedCourses(curso: any) {
    const index = this.selectedCourses.indexOf(curso);
    if (index !== -1) {
      this.selectedCourses.splice(index, 1);
    }
  }
}
