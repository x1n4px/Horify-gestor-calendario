import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import { HoursWorkedService } from '../../service/hours-worked.service';
import { HoursWorked } from '../../models/hoursWorked.model';
@Component({
  selector: 'app-calendar',
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit{
  tiendaSeleccionada: string = '';
  empleadoSeleccionado: string = '';
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

  horasTrabajadas: HoursWorked [] = [];

  // Modal variables
  modalVisible = false;
  horaTrabajo = {
    fecha: '',
    hora_entrada: '',
    hora_salida: ''
    
  };

  constructor(public employeeService: EmployeeService, public hoursWorkedService:HoursWorkedService) {
    //this.generarMatriz();
  }
  ngOnInit(): void {
    this.getEmployee();
    this.getHoursWorked();
   
  }
  employee: any;

  getEmployee() {
    this.employeeService.getEmployee(1).subscribe(
      (data) => {
        this.employee = data;
        this.tiendaSeleccionada = this.employee.empleado.id + " - " + this.employee.empleado.tienda_nombre;
        this.empleadoSeleccionado =  this.employee.empleado.name + " " + this.employee.empleado.surname;
      }
    )
  } 

  hours: any;
  getHoursWorked() {
    this.hoursWorkedService.getHoursWorked(1).subscribe(
      (data) => {
        this.hours = data;
        this.horasTrabajadas = this.hours.rows;
        this.generarMatriz();
      }
    )
  }


  generarMatriz() {
    const diasEnMes = new Date(new Date().getFullYear(), this.mesSeleccionado, 0).getDate();
    this.matriz = [];



    for (let dia = 1; dia <= diasEnMes; dia++) {
      const fecha = new Date(new Date().getFullYear(), this.mesSeleccionado - 1, dia);
      const diaSemana = this.obtenerDiaSemana(fecha.getDay()); // Obtiene el día de la semana
      const diaCompleto = `${diaSemana} ${this.pad(dia)}/${this.pad(this.mesSeleccionado)}/${new Date().getFullYear()}`; // Formato: Sábado 04/02/2025
      
      const diaTrabajado = this.horasTrabajadas.filter(hora => new Date(hora.fecha).toISOString().split('T')[0]  === `${new Date().getFullYear()}-${this.pad(this.mesSeleccionado)}-${this.pad(dia)}`);
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

  // Guardar las horas trabajadas
  guardarHoras() {
    const nuevaHoraTrabajada = {
      empleado_id: 1, tienda_id: 1,
      fecha: this.horaTrabajo.fecha,
      hora_entrada: this.horaTrabajo.hora_entrada,
      hora_salida: this.horaTrabajo.hora_salida,
    };

    // Añadir al array de horas trabajadas
    this.horasTrabajadas.push(nuevaHoraTrabajada);

    // Generar la nueva matriz con las horas actualizadas
    this.generarMatriz();

    // Cerrar el modal
    //this.cerrarModal();
  }



seleccionarCelda(diaIndex: number, slotIndex: number, dia: any, slot: any) {
  const horaSeleccionada = this.horas[slotIndex]; // Obtener la hora correspondiente
  const fechaSeleccionada = this.formatearFecha(dia.diaCompleto); // Normalizar la fecha
  
  // Buscar si ya existe un registro con esa fecha
  let registroExistente = this.horasTrabajadas.find(h => h.fecha === fechaSeleccionada);

  if (registroExistente) {
    // Si la hora seleccionada es anterior a la hora de entrada, actualizar hora_entrada
    if (horaSeleccionada < registroExistente.hora_entrada) {
      registroExistente.hora_entrada = horaSeleccionada;
    }
    // Si la hora seleccionada es posterior a la hora de salida, actualizar hora_salida
    if (horaSeleccionada > registroExistente.hora_salida) {
      registroExistente.hora_salida = horaSeleccionada;
    }
  } else {
    // Si no existe, crear un nuevo registro
    this.horasTrabajadas.push({
      empleado_id: 1,
      tienda_id: 1,
      hora_entrada: horaSeleccionada,
      hora_salida: horaSeleccionada,
      fecha: fechaSeleccionada
    });
  }

  // Alternar selección de la celda


  this.generarMatriz()
}

formatearFecha(diaCompleto: string): string {
  const meses: { [key: string]: string } = {
    "Enero": "01", "Febrero": "02", "Marzo": "03", "Abril": "04",
    "Mayo": "05", "Junio": "06", "Julio": "07", "Agosto": "08",
    "Septiembre": "09", "Octubre": "10", "Noviembre": "11", "Diciembre": "12"
  };

  const partes = diaCompleto.split(" ");
  if (partes.length !== 2) return ""; // Validación

  const [dia, mes, anio] = partes[1].split("/");
  return `${anio}-${mes}-${dia}`;
}

}
