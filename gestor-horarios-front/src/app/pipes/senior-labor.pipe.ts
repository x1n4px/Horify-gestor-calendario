import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seniorLabor'
})
export class SeniorLaborPipe implements PipeTransform {

  transform(value: any): string {
    if (!value) return '';
    
    // Asegurarse de que la entrada es una fecha válida
    const date = new Date(value);
    const currentDate = new Date();

    let years = currentDate.getFullYear() - date.getFullYear();
    let months = currentDate.getMonth() - date.getMonth();

    // Si el mes de la fecha dada es posterior al mes actual, ajustamos los años y meses
    if (months < 0) {
      years--;
      months += 12; // Ajustamos los meses para que no sea negativo
    }

    let duration = '';

    // Si tenemos años, los mostramos
    if (years > 0) {
      duration += `${years} año${years > 1 ? 's' : ''}`;
    }

    // Si hay meses, los mostramos también
    if (months > 0) {
      if (duration) {
        duration += ' y ';
      }
      duration += `${months} mes${months > 1 ? 'es' : ''}`;
    }

    // Si no hay diferencia, significa que es menos de un mes
    if (duration === '') {
      return 'Menos de un mes';
    }

    return duration;
  }

}
