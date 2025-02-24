import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-calendar',
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

  meses = [
    { label: 'Enero', value: 1 },
    { label: 'Febrero', value: 2 },
    { label: 'Marzo', value: 3 },
    { label: 'Abril', value: 4 },
    { label: 'Mayo', value: 5 },
    { label: 'Junio', value: 6 },
    { label: 'Julio', value: 7 },
    { label: 'Agosto', value: 8 },
    { label: 'Septiembre', value: 9 },
    { label: 'Octubre', value: 10 },
    { label: 'Noviembre', value: 11 },
    { label: 'Diciembre', value: 12 }
  ];

  horas = Array.from({ length: 18 }, (_, i) => `${6 + i}:00`); // Horas de 6:00 a 23:00

  mesSeleccionado = new Date().getMonth() + 1; // Mes actual por defecto
  matriz: { diaCompleto: string, slots: string[] }[] = [];

  horasTrabajadas = [
    { empleado_id: 1, tienda_id: 1, hora_entrada: '08:00', hora_salida: '14:00', fecha: '2025-02-01' },
    { empleado_id: 2, tienda_id: 1, hora_entrada: '09:00', hora_salida: '15:00', fecha: '2025-02-02' },
    { empleado_id: 1, tienda_id: 1, hora_entrada: '10:00', hora_salida: '18:00', fecha: '2025-02-05' },
  ];

  constructor() {
    this.generarMatriz();
  }

  generarMatriz() {
    const diasEnMes = new Date(new Date().getFullYear(), this.mesSeleccionado, 0).getDate();
    this.matriz = [];

    for (let dia = 1; dia <= diasEnMes; dia++) {
      const fecha = new Date(new Date().getFullYear(), this.mesSeleccionado - 1, dia);
      const diaSemana = this.obtenerDiaSemana(fecha.getDay()); // Obtiene el día de la semana
      const diaCompleto = `${diaSemana} ${this.pad(dia)} / ${this.pad(this.mesSeleccionado)}/${new Date().getFullYear()}`; // Formato: Sábado 04/02/2025

      const diaTrabajado = this.horasTrabajadas.filter(hora => hora.fecha === `${new Date().getFullYear()}-${this.pad(this.mesSeleccionado)}-${this.pad(dia)}`);

      let slots: string[] = Array(18).fill(''); // Inicialmente todas las celdas vacías

      diaTrabajado.forEach((trabajo) => {
        const entradaIndex = this.getHoraIndex(trabajo.hora_entrada);
        const salidaIndex = this.getHoraIndex(trabajo.hora_salida) + 1;


        // Marcar los slots de las horas trabajadas
        for (let i = entradaIndex; i < salidaIndex; i++) {
          slots[i] = 'Trabajando';
        }
      });

      this.matriz.push({
        diaCompleto,
        slots
      });
    }
  }

  obtenerDiaSemana(dia: number): string {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return diasSemana[dia];
  }

  pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  // Función para convertir hora en formato 'HH:MM' a índice
  getHoraIndex(hora: string): number {
    const horas = parseInt(hora.split(':')[0]);
    const minutos = parseInt(hora.split(':')[1]);
    const index = horas - 6 + (minutos === 30 ? 0.5 : 0) ; // De 6:00 a 23:00
    return Math.ceil(index); // Usar Math.ceil para redondear hacia arriba
  }

}
