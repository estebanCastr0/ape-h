import { Component } from '@angular/core';

@Component({
  selector: 'app-promedio',
  templateUrl: './promedio.component.html',
  styleUrls: ['./promedio.component.css']
})
export class PromedioComponent {
  cortes: number[] = [0];
  values: number[] = [0];
  pesos: number[] = [0];
  posibles: number[] = [];
  modificar: number[]= [];
  average: number = 0;
  weightedAverage: number | null = null;
  errorMessage: string | null = null;
  resultados: string ="";

  calculateAverage() {
    const validValues = this.values.filter(value => !isNaN(value));
    const validPesos = this.pesos.filter(peso => !isNaN(peso));

console.log(validValues+" "+validPesos);

    if (validValues.length === validPesos.length) {
      var res = 0;
      for (let j = 0; j <validValues.length; j++) {
        res = res + (validValues[j] * this.pesos[j]);
      }
      this.average=res;
    } else {
      this.weightedAverage = null;
      this.errorMessage = "Por favor agrega las notas y pesos respectivos.";
    }
  }

  addCorteField() {
    this.cortes.push(0);
    this.values.push(0);
    this.pesos.push(0);
  }

  removeCorteField(index: number) {
    this.cortes.splice(index, 1);
    this.values.splice(index, 1);
  }

  calcularPredictivo() {
    const validValues = this.values.filter(value => !isNaN(value));
    const validPesos = this.pesos.filter(peso => !isNaN(peso));
    var verif = 0;
    this.resultados="";
    this.posibles=[];
    this.modificar=[];

    for(let i = 0;i<=this.cortes[0]-1;i++){
      if(validValues[i]!=0){
      this.posibles.push(validValues[i]);
      this.modificar.push(0);
      }
      else{
        this.posibles.push(0);
        this.modificar.push(1);
        verif += 1;
      }
    }

    if(verif>=1){
    var final = 0;
    for(let m = 0;m<this.modificar.length;m++){
      if(this.modificar[m]===1){
        final=m;
      }
    }
    while (this.posibles[final] <= 5) {
      let res = 0;
    
      for (let j = 0; j < this.posibles.length; j++) {
        res = res + (this.posibles[j] * this.pesos[j]);
        if (this.modificar[j] === 1) {
          this.posibles[j] += 0.1;
        }
    
        if (res >= 3 && res <= 5) {
          this.resultados += "|Notas:"+ this.posibles +", Nota final: "+ res +"|";
        }
      }
    
      for (let k = 0; k < this.posibles.length - 1; k++) {
        if (this.posibles[k] === 5 && this.modificar[k] === 1) {
          this.posibles[k] = 0;
          this.posibles[k + 1] += 0.1;
        }
      }
    
    }
    this.errorMessage=this.resultados;
  }
  else{
    this.errorMessage="Todas las notas fueron digitadas, no se requiere analisis predictivo";
  }
}
  
}


