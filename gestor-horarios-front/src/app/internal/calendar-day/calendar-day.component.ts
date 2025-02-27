import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import { HoursWorkedService } from '../../service/hours-worked.service';
import { WorkedHour } from '../../models/hoursWorked.model';
import { StoreService } from '../../service/store.service';
import { Employee } from '../../models/employee';
import { Contract } from '../../models/contract.model';

@Component({
  selector: 'app-calendar-day',
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar-day.component.html',
  styleUrl: './calendar-day.component.css',
})
export class CalendarDayComponent {
  tiendaSeleccionada: string = '';
    empleadoSeleccionado!: Employee;
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
      { label: 'Diciembre', value: 12 },
    ];
  
    horas = Array.from({ length: 18 }, (_, i) => `${6 + i}:00`); // Horas de 6:00 a 23:00
  
    selectedMonth = new Date().getMonth() + 1; // Mes actual por defecto
    matriz: { fullDay: string; slots: string[] }[] = [];
  
    workedHours: WorkedHour[] = [];
    anualHours = 0;
  
    // Modal variables
    modalVisible = false;
    horaTrabajo = {
      fecha: '',
      hora_entrada: '',
      hora_salida: '',
    };
  
    contract?: Contract;
    employees: any[] = [];
    employee: any;
  
    constructor(
      public employeeService: EmployeeService,
      public hoursWorkedService: HoursWorkedService,
      private storeService: StoreService
    ) {
      //this.generarMatriz();
    }
    ngOnInit(): void {
      this.getShop();
    }
  
    
    getShop() {
      this.storeService.getStore(1032).subscribe((data: any) => {
        this.tiendaSeleccionada = data.tienda.id + ' - ' + data.tienda.nombre;
        this.employees = data.tienda.empleados;
      });
    }
  
    
  
    getEmployee(id: number) {
      this.employeeService.getEmployee(id).subscribe((data:any) => {
        this.employee = data.empleado;
        console.log(this.employee)
        this.empleadoSeleccionado.name = this.employee.name;
        this.empleadoSeleccionado.surname = this.employee.surname;
      });
    }
  
    getHoursWorked(id: number) {
      this.hoursWorkedService.getHoursWorked(id).subscribe((data:any) => {
        this.workedHours = data.rows;
        this.contract = data.contrato;
        this.workedHours.forEach((element: any) => {
          this.anualHours += element.horas
        });
        this.generarMatriz();
      });
    }
  
    onEmpleadoSeleccionado() {
      this.getEmployee(this.empleadoSeleccionado.id);
      this.getHoursWorked(this.empleadoSeleccionado.id);
    }
  
    generarMatriz() {
      const diasEnMes = new Date(
        new Date().getFullYear(),
        this.selectedMonth,
        0
      ).getDate();
      this.matriz = [];
  
      for (let dia = 1; dia <= diasEnMes; dia++) {
        const fecha = new Date(
          new Date().getFullYear(),
          this.selectedMonth - 1,
          dia
        );
        const diaSemana = this.obtenerDiaSemana(fecha.getDay()); // Obtiene el día de la semana
        const fullDay = `${diaSemana} ${this.pad(dia)}/${this.pad(
          this.selectedMonth
        )}/${new Date().getFullYear()}`; // Formato: Sábado 04/02/2025
  
        const diaTrabajado = this.workedHours.filter(
          (hora) =>
            new Date(hora.creation_date).toISOString().split('T')[0] ===
            `${new Date().getFullYear()}-${this.pad(
              this.selectedMonth
            )}-${this.pad(dia)}`
        );
        let slots: string[] = Array(18).fill(''); // Inicialmente todas las celdas vacías
  
        diaTrabajado.forEach((trabajo) => {
          const entradaIndex = this.getHoraIndex(trabajo.entry_time);
          const salidaIndex = this.getHoraIndex(trabajo.departure_time) + 1;
  
          // Marcar los slots de las horas trabajadas
          for (let i = entradaIndex; i < salidaIndex; i++) {
            slots[i] = 'Trabajando';
          }
        });
  
        this.matriz.push({
          fullDay,
          slots,
        });
      }
    }
  
    obtenerDiaSemana(dia: number): string {
      const diasSemana = [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
      ];
      return diasSemana[dia];
    }
  
    pad(num: number): string {
      return num < 10 ? `0${num}` : `${num}`;
    }
  
    // Función para convertir hora en formato 'HH:MM' a índice
    getHoraIndex(hora: string): number {
      const horas = parseInt(hora.split(':')[0]);
      const minutos = parseInt(hora.split(':')[1]);
      const index = horas - 6 + (minutos === 30 ? 0.5 : 0); // De 6:00 a 23:00
      return Math.ceil(index); // Usar Math.ceil para redondear hacia arriba
    }
  
    // Guardar las horas trabajadas
    guardarHoras() {
      console.log(this.employee)
      const nuevaHoraTrabajada: WorkedHour = {
        employee_id: this.employee.id,
        store_id: this.employee.tienda_id,
        creation_date: this.horaTrabajo.fecha,
        entry_time: this.horaTrabajo.hora_entrada,
        departure_time: this.horaTrabajo.hora_salida,
        time: 0
      };
  
      // Añadir al array de horas trabajadas
      this.workedHours.push(nuevaHoraTrabajada);
  
      // Generar la nueva matriz con las horas actualizadas
      this.generarMatriz();
  
      // Cerrar el modal
      //this.cerrarModal();
    }
  
    seleccionarCelda(diaIndex: number, slotIndex: number, dia: any, slot: any) {
      const horaSeleccionada = this.horas[slotIndex]; // Obtener la hora correspondiente
      const fechaSeleccionada = this.formatearFecha(dia.fullDay); // Normalizar la fecha
  
      // Buscar si ya existe un registro con esa fecha
      let registroExistente = this.workedHours.find(
        (h) => h.creation_date === fechaSeleccionada
      );
  
      if (registroExistente) {
        // Si la hora seleccionada es anterior a la hora de entrada, actualizar hora_entrada
        if (horaSeleccionada < registroExistente.entry_time) {
          registroExistente.entry_time = horaSeleccionada;
        }
        // Si la hora seleccionada es posterior a la hora de salida, actualizar hora_salida
        if (horaSeleccionada > registroExistente.departure_time) {
          registroExistente.departure_time = horaSeleccionada;
        }
      } else {
        // Si no existe, crear un nuevo registro
        console.log(this.employee)
        this.workedHours.push({
          employee_id: this.employee.id,
          store_id: this.employee.tienda_id,
          entry_time: horaSeleccionada,
          departure_time: horaSeleccionada,
          creation_date: fechaSeleccionada,
          time: 0
        });
      }
  
      // Alternar selección de la celda
  
      this.generarMatriz();
    }
  
    formatearFecha(fullDay: string): string {
      const meses: { [key: string]: string } = {
        Enero: '01',
        Febrero: '02',
        Marzo: '03',
        Abril: '04',
        Mayo: '05',
        Junio: '06',
        Julio: '07',
        Agosto: '08',
        Septiembre: '09',
        Octubre: '10',
        Noviembre: '11',
        Diciembre: '12',
      };
  
      const partes = fullDay.split(' ');
      if (partes.length !== 2) return ''; // Validación
  
      const [dia, mes, anio] = partes[1].split('/');
      return `${anio}-${mes}-${dia}`;
    }
  
    
  
  
    saveChanges() {
      console.log(this.workedHours)
      this.hoursWorkedService.saveHoursWorked(this.workedHours).subscribe(
        (data) => {
          console.log(data);
        }, error => {
          console.error("Error en el guardado");
        }
      )
    }
}
