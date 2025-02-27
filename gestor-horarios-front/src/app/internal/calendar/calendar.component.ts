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
  selector: 'app-calendar',
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
  selectedStore: string = '';
  selectedEmployee!: Employee;
  month = [
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

  hours = Array.from({ length: 18 }, (_, i) => `${6 + i}:00`); // hours de 6:00 a 23:00

  selectedMonth = new Date().getMonth() + 1; // Mes actual por defecto
  matriz: { fullDay: string; slots: string[] }[] = [];

  workedHours: WorkedHour[] = [];
  anualHours = 0;

  // Modal variables
  modalVisible = false;
  workedHour = {
    creation_date: '',
    entry_time: '',
    departure_time: '',
  };

  contract?: Contract;
  employees: any[] = [];

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
      this.selectedStore = data.store.id + ' - ' + data.store.name;
      this.employees = data.store.employee;
    });
  }

  

  getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe((data:any) => {
      this.selectedEmployee.name = data.employee.name;
      this.selectedEmployee.surname = data.employee.surname;
    });
  }

  getHoursWorked(id: number) {
    this.hoursWorkedService.getHoursWorked(id).subscribe((data:any) => {
      this.workedHours = data.rows;
      this.contract = data.contrato;
      this.workedHours.forEach((element: any) => {
        this.anualHours += element.hours
      });
      this.generarMatriz();
    });
  }

  onselectedEmployee() {
    this.getEmployee(this.selectedEmployee.id);
    this.getHoursWorked(this.selectedEmployee.id);
  }

  generarMatriz() {
    const diasEnMes = new Date(
      new Date().getFullYear(),
      this.selectedMonth,
      0
    ).getDate();
    this.matriz = [];

    for (let dia = 1; dia <= diasEnMes; dia++) {
      const creation_date = new Date(
        new Date().getFullYear(),
        this.selectedMonth - 1,
        dia
      );
      const diaSemana = this.obtenerDiaSemana(creation_date.getDay()); // Obtiene el día de la semana
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

        // Marcar los slots de las hours trabajadas
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
    const hours = parseInt(hora.split(':')[0]);
    const minutos = parseInt(hora.split(':')[1]);
    const index = hours - 6 + (minutos === 30 ? 0.5 : 0); // De 6:00 a 23:00
    return Math.ceil(index); // Usar Math.ceil para redondear hacia arriba
  }

  // Guardar las hours trabajadas
  guardarhours() {
    const nuevaHoraTrabajada: WorkedHour = {
      employee_id: this.selectedEmployee.id,
      store_id: this.selectedEmployee.store_id,
      creation_date: this.workedHour.creation_date,
      entry_time: this.workedHour.entry_time,
      departure_time: this.workedHour.departure_time,
      time: 0
    };

    // Añadir al array de hours trabajadas
    this.workedHours.push(nuevaHoraTrabajada);

    // Generar la nueva matriz con las hours actualizadas
    this.generarMatriz();

    // Cerrar el modal
    //this.cerrarModal();
  }

  seleccionarCelda(diaIndex: number, slotIndex: number, dia: any, slot: any) {
    const selectedHour = this.hours[slotIndex]; // Obtener la hora correspondiente
    const creation_dateSeleccionada = this.formatearcreation_date(dia.fullDay); // Normalizar la creation_date

    // Buscar si ya existe un registro con esa creation_date
    let registroExistente = this.workedHours.find(
      (h) => h.creation_date === creation_dateSeleccionada
    );

    if (registroExistente) {
      // Si la hora seleccionada es anterior a la hora de entrada, actualizar entry_time
      if (selectedHour < registroExistente.entry_time) {
        registroExistente.entry_time = selectedHour;
      }
      // Si la hora seleccionada es posterior a la hora de salida, actualizar departure_time
      if (selectedHour > registroExistente.departure_time) {
        registroExistente.departure_time = selectedHour;
      }
    } else {
      // Si no existe, crear un nuevo registro
      this.workedHours.push({
        employee_id: this.selectedEmployee.id,
        store_id: this.selectedEmployee.store_id,
        entry_time: selectedHour,
        departure_time: selectedHour,
        creation_date: creation_dateSeleccionada,
        time: 0
      });
    }

    // Alternar selección de la celda

    this.generarMatriz();
  }

  formatearcreation_date(fullDay: string): string {
    const month: { [key: string]: string } = {
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
    this.hoursWorkedService.saveHoursWorked(this.workedHours).subscribe(
      (data) => {
        console.log(data);
      }, error => {
        console.error("Error en el guardado");
      }
    )
  }
}
