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
  selectedDate: any;
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
  matriz: { slots: string[]; employee: string}[] = [];

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

  getHoursWorked() {
    this.hoursWorkedService.getHoursWorkedByDate(this.selectedDate).subscribe((data:any) => {
      console.log(data)
      this.workedHours = data;
      this.generarMatriz();
    });
  }

  onselectedEmployee() {
    this.getEmployee(this.selectedEmployee.id);
    this.getHoursWorked();
  }

  generarMatriz() {
    this.matriz = [];
  
    this.employees.forEach((empleado: Employee) => {
      let filaEmpleado = {
        employee: `${empleado.name} ${empleado.surname}`,
        slots: Array(18).fill('') // De 6:00 a 24:00 (19 slots)
      };
  
      const horas = Array.from({ length: 18 }, (_, i) => `${6 + i}:00`);
  
      this.workedHours
        .filter(hora => hora.employee_id === empleado.id)
        .forEach(trabajo => {
          const entradaIndex = this.getHoraIndex(trabajo.entry_time);
          const salidaIndex = this.getHoraIndex(trabajo.departure_time);
  
          for (let i = entradaIndex; i <= salidaIndex; i++) {
            filaEmpleado.slots[i] = 'Trabajando'; // Marcar en verde
          }
        });
  
      this.matriz.push(filaEmpleado);
    });
  }
  
  getHoraIndex(hora: string): number {
    const [hours, minutes] = hora.split(':').map(Number);
    return hours - 6; // Ajuste para que 6:00 sea índice 0
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
