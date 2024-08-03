import { Component, ChangeDetectorRef} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-seleccion-materias',
  templateUrl: './seleccion-materias.component.html',
  styleUrls: ['./seleccion-materias.component.scss']
})
export class SeleccionMateriasComponent {

  cursos: any[] = []; // Arreglo de cursos
  horariosClase: any[] = [];
  cursosElectivos: any[] = []; // Arreglo de cursos electivos

  // Arreglo de horarios
  horarios: any[] = [
  { hora: '7:00 - 8:00', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '', sabado: '' },
  { hora: '8:00 - 9:00', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '', sabado: '' },
  { hora: '9:00 - 10:00', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '', sabado: '' },
  { hora: '10:00 - 11:00', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '', sabado: '' },
  { hora: '11:00 - 12:00', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '', sabado: '' },
  { hora: '12:00 - 13:00', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '', sabado: '' },
  { hora: '13:00 - 14:00', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '', sabado: '' },
  { hora: '14:00 - 15:00', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '', sabado: '' },
  { hora: '15:00 - 16:00', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '', sabado: '' },
  { hora: '16:00 - 17:00', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '', sabado: '' },
  { hora: '17:00 - 18:00', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '', sabado: '' },
  { hora: '18:00 - 19:00', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '', sabado: '' },
  { hora: '19:00 - 20:00', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '', sabado: '' },
  { hora: '20:00 - 21:00', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '', sabado: '' },
  { hora: '21:00 - 22:00', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '', sabado: '' }
];


  // Columnas a mostrar en la tabla
  displayedColumns: string[] = ['hora', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

  // DataSource para la tabla
  dataSource = new MatTableDataSource<any>(this.horarios);

  constructor(private cdr: ChangeDetectorRef) {
    this.cargarCursos();
    this.cargarCursosElectivos();
  }

  cargarCursos() {
    this.cursos = [];
  }

  cargarCursosElectivos() {
    this.cursosElectivos = [];
    }

    // Add this property
csvLoadedE: boolean = false;

cargarElectivas(event): void {
  try {
    const file: File = event.target.files[0];
    if (!file) {
      return;
    }
    
    // Check if file type is CSV
    if (file.type !== 'text/csv') {
      console.error('Invalid file type. Please select a CSV file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.cursosElectivos = [];
      const csvData: string = reader.result as string;
      const lines: string[] = csvData.split('\n');
      for (let i = 1; i < lines.length; i++) { // Start from index 1 to skip the first line
        const parts: string[] = lines[i].split(',');
        if (parts.length >= 2) {
          const cursoE = {
            idCurso: parts[0], // Use a function to generate unique IDs
            nombre: parts[1].trim(),
            day: parts[3],
            hora: parts[4]+" - "+parts[5],
            selected: false
          };
          this.cursosElectivos.push(cursoE);
        }
      }
      
      // Set csvLoaded to true after loading the CSV file
      this.csvLoadedE = true;
    };
    reader.readAsText(file);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

cargarHorariosClase(event): void {
  try {
    const file: File = event.target.files[0];
    if (!file) {
      return;
    }
    
    // Check if file type is CSV
    if (file.type !== 'text/csv') {
      console.error('Invalid file type. Please select a CSV file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.horariosClase = [];
      const csvData: string = reader.result as string;
      const lines: string[] = csvData.split('\n');

      // Iterate through each line of the CSV file
      for (let i = 1; i < lines.length; i++) { // Start from index 1 to skip the header
        const parts: string[] = lines[i].split(',');
        // Find the matching course from cursos list based on course code or name
        var matchingCurso = this.cursos.find(curso => {
          return curso.idCurso === parts[0] || curso.nombre === parts[1];
        });
        // If a matching curso is found, add it to horariosClase
        if (matchingCurso) {
            const hin = parts[4].split(":")
            const hen = parts[5].split(":")
            const time = parts[7].trim() // Remove leading and trailing whitespace characters
          this.horariosClase.push({
            idCurso: parts[0], // Use a function to generate unique IDs
            nombre: parts[1].trim(),
            day: parts[3],
            hora: hin[0]+":"+hin[1]+" - "+hen[0]+":"+hen[1],
            time: time,
            selected: false // Assuming the course name is in the second column of the CSV file
          });
        }
        if (parts[7].trim() === "ElectivaP" && this.hasElectivaP){
          const curso = {
            idCurso: parts[0], // Use a function to generate unique IDs
            nombre: parts[1].trim(),
            selected: false,
            horarioE: true
            // Add more properties as needed
          };
          this.cursos.push(curso);
        }
      }

      // Set csvLoaded to true after loading the CSV file
      this.csvLoaded = true;
    };
    reader.readAsText(file);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

// Add this property
csvLoaded: boolean = false;

hasElectiva = false;

hasElectivaP = false;

handleFileInput(event): void {
  try {
    const file: File = event.target.files[0];
    if (!file) {
      return;
    }
    
    // Check if file type is CSV
    if (file.type !== 'text/csv') {
      console.error('Invalid file type. Please select a CSV file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.cursos = [];
      const csvData: string = reader.result as string;
      const lines: string[] = csvData.split('\n');
      
      // Flag to check if "Electiva" course is found
      let hasElectiva = false;

      for (let i = 1; i < lines.length; i++) { // Start from index 1 to skip the first line
        const parts: string[] = lines[i].split(',');
        if (parts.length >= 2) {
          if(parts[1].includes('PROFESIONAL')){
            this.hasElectivaP = true;
          }else{

          const curso = {
            idCurso: parts[0], // Use a function to generate unique IDs
            nombre: parts[1].trim(),
            selected: false,
            horarioE: false
            // Add more properties as needed
          };
          this.cursos.push(curso);
        }
          // Check if the second part contains "Electiva"
          if (parts[1].includes('ELECTIVA')) {
            hasElectiva = true;
          }
        }
      }
      
      // Set csvLoaded to true after loading the CSV file
      this.csvLoaded = true;

      // Set hasElectiva flag to indicate if "Electiva" course is found
      this.hasElectiva = hasElectiva;
    };
    reader.readAsText(file);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

private getHour(number: string): any{
    if(number.includes("7:00")){
    return 0
    }
    else if(number === "8:00"){
    return 1    
    }
    else if(number === "9:00"){
    return 2    
    }
    else if(number === "10:00"){
    return 3    
    }
    else if(number === "11:00"){
    return 4    
    }
    else if(number === "12:00"){
    return 5    
    }
    else if(number === "13:00"){
    return 6    
    }
    else if(number === "14:00"){
    return 7    
    }
    else if(number === "15:00"){
    return 8    
    }
    else if(number === "16:00"){
    return 9    
    }
    else if(number === "17:00"){
    return 10    
    }
    else if(number === "18:00"){
    return 11    
    }
    else if(number === "19:00"){
    return 12    
    }
    else if(number === "20:00"){
    return 13    
    }
    else if(number === "21:00"){
    return 14    
    }
    else if(number === "22:00"){
    return 15    
    }
    else{
    return -1
    }
}

toggleCurso(curso: any, selectedTime: string): void {
  curso.selected = !curso.selected;
  const str = curso.nombre.substring(1, curso.nombre.length - 3);
  const horarios = curso.horarioE
  var matchingHorarios
  if (curso.selected) {
    if(horarios){
      console.log('Works Select')
      matchingHorarios = this.horariosClase.filter((horario) => 
        horario.nombre.includes(str)
      );
    }
    else{
      // Find all matching class schedules for the selected curso based on name and time
      matchingHorarios = this.horariosClase.filter((horario) => 
      horario.nombre.includes(str) && horario.time === selectedTime
    );
    }
    if (matchingHorarios.length > 0) {
      // Iterate through each matching class schedule
      var cruze = false
      matchingHorarios.forEach(horario => {
        const [cursoStartHour, cursoEndHour] = horario.hora.split(' - ');
        const timeSlotIndex = this.getHour(cursoStartHour);
        if (timeSlotIndex !== -1) {
          // If time slot found, assign the class to that slot
          if(this.horarios[timeSlotIndex][horario.day.toLowerCase()] === '' && this.horarios[timeSlotIndex+1][horario.day.toLowerCase()] === '' ){
            this.horarios[timeSlotIndex][horario.day.toLowerCase()] = horario.nombre;
            this.horarios[timeSlotIndex + 1][horario.day.toLowerCase()] = horario.nombre;
          }
          else{
            window.alert('There is a class already assigned.');
            cruze = true
          }
        } else {
          // If no appropriate time slot found, display error message
          window.alert('No available time slot for the selected class schedule.');
          // Deselect the curso
          curso.selected = false;
          return; // Exit the method
        }
      });

      if (cruze){
        matchingHorarios.forEach(horario =>{
          this.removeCursoFromHorarios(horario);
        });
      }
    } else {
      // If no matching class schedules found, display error message
      window.alert('No class schedule found for the selected curso and time.');
      // Deselect the curso
      curso.selected = false;
      return; // Exit the method
    }
  } else {
    
    if(horarios){
      matchingHorarios = this.horariosClase.filter((horario) => 
        horario.nombre.includes(str)
      );
    }
    else{
      matchingHorarios = this.horariosClase.filter((horario) => 
        horario.nombre.includes(str) && horario.time === selectedTime
      );  
    }

    if (matchingHorarios.length > 0) {
      // Iterate through each matching class schedule
      matchingHorarios.forEach(horario => {
        this.removeCursoFromHorarios(horario);
      });
    } else {
    }
  }

  // Update the table
  this.updateTable();
}



toggleCursoElectivo(cursoElectivo: any): void {
  cursoElectivo.selected = !cursoElectivo.selected;

  if (cursoElectivo.selected) {
    // Find the appropriate time slots based on day and time range
    const [cursoStartHour, cursoEndHour] = cursoElectivo.hora.split(' - ');

    // Find the index of the first hour time slot
    const timeSlotIndex1 = this.horarios.findIndex(slot => {
      const [startHour, endHour] = slot.hora.split(' - ');

      // Check if the selected cursoElectivo fits within the time slot
      return (
        slot[cursoElectivo.day.toLowerCase()] === '' &&
        startHour <= cursoStartHour && endHour > cursoStartHour
      );
    });

    // Find the index of the second hour time slot
    const timeSlotIndex2 = this.horarios.findIndex(slot => {
      const [startHour, endHour] = slot.hora.split(' - ');

      // Check if the selected cursoElectivo fits within the time slot
      return (
        slot[cursoElectivo.day.toLowerCase()] === '' &&
        startHour < cursoEndHour && endHour >= cursoEndHour
      );
    });

    if (timeSlotIndex1 !== -1 && timeSlotIndex2 !== -1) {
      // If both time slots found, add cursoElectivo to both slots
      this.horarios[timeSlotIndex1][cursoElectivo.day.toLowerCase()] = cursoElectivo.nombre;
      this.horarios[timeSlotIndex2][cursoElectivo.day.toLowerCase()] = cursoElectivo.nombre;
    } else {
      // If no appropriate time slots found, display error message
      window.alert('No available time slots for the selected day and time.');
      return; // Exit the method
    }
  } else {
    // If cursoElectivo is deselected, remove it from horarios
    this.removeCursoElectivoFromHorarios(cursoElectivo);
  }

  // Update the table
  this.updateTable();
}

getNextDay(day: string): string {
  const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  const currentIndex = days.findIndex(d => d === day);
  return currentIndex === days.length - 1 ? days[0] : days[currentIndex + 1];
}

private removeCursoElectivoFromHorarios(cursoElectivo: any): void {
    // Find and remove cursoElectivo from horarios
    this.horarios.forEach(slot => {
        if (slot[cursoElectivo.day.toLowerCase()] === cursoElectivo.nombre) {
            slot[cursoElectivo.day.toLowerCase()] = '';
        }
    });
}

private removeCursoFromHorarios(curso: any): void {
    // Find and remove cursoElectivo from horarios
    this.horarios.forEach(slot => {
        if (slot[curso.day.toLowerCase()].includes(curso.nombre)) {
            slot[curso.day.toLowerCase()] = '';
        }
    });
}

printSelectedCursosElectivos(): void {
    const selectedCursosElectivos = this.horarios;
    console.log(selectedCursosElectivos);
}

  private updateTable(): void {
    // Update the datasource with the new data
    this.dataSource.data = this.horarios;

    // Manually trigger change detection
    this.cdr.detectChanges();
  }

  generatePDF(): void {
  // Calculate the width and height of the content (table) in points (1 inch = 72 points)
  const contentWidth = this.horarios.length * 50; // Assuming average cell width of 50
  const contentHeight = (this.horarios.length + 1) * 20; // Assuming average cell height of 20 and one extra row for header

  // Calculate the page width and height considering the content size and desired margin
  const pageWidth = contentWidth + 40; // Add 20 units margin on left and right
  const pageHeight = contentHeight + 40; // Add 20 units margin on top and bottom

  // Define custom margins based on the calculated page size
  const margins = [20, 20, 20, 20]; // Left, Top, Right, Bottom

  const docDefinition = {
    pageMargins: margins,
    pageSize: {
      width: pageWidth,
      height: pageHeight
    },
    content: [
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', '*', '*', '*', '*', '*'],
          body: [
            ['Hora', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            ...this.horarios.map(horario => [
              horario.hora,
              horario.lunes,
              horario.martes,
              horario.miercoles,
              horario.jueves,
              horario.viernes,
              horario.sabado
            ])
          ]
        }
      }
    ]
  };

  pdfMake.createPdf(docDefinition).open();
}


}
