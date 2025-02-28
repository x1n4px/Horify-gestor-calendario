import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'week'
})
export class WeekPipe implements PipeTransform {

  transform(value: Date): string {
    if (!value) return ''; // Verificar si la fecha es válida

    const date = new Date(value);

    // Formatear la fecha como dd/mm/yyyy
    const day = String(date.getDate()).padStart(2, '0'); // Asegurar que el día tenga 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Asegurar que el mes tenga 2 dígitos
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    // Calcular la semana
    const startOfYear = new Date(date.getFullYear(), 0, 1); // Primer día del año
    const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)); // Días transcurridos desde el inicio del año
    const weekNumber = Math.ceil((days + 1) / 7); // Calcular la semana del año

    return `${formattedDate} (Semana ${weekNumber})`;
  }

}
