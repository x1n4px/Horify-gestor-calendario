import { Component } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { StoreService } from '../../service/store.service';
import { Employee } from '../../models/employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VacationService } from '../../service/vacation.service';
import { Vacation } from '../../models/vacation.model';
import { WeekPipe } from '../../pipes/week.pipe';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { VacationModalComponent } from './vacation-modal/vacation-modal.component';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-vacations',
  imports: [
    CommonModule,
    FormsModule,
    WeekPipe,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './vacations.component.html',
  styleUrl: './vacations.component.css',
})
export class VacationsComponent {
  selectedStore: string = '';
  selectedEmployee!: Employee;
  vacations: Vacation[] = [];
  employees: any[] = [];

  constructor(
    public employeeService: EmployeeService,
    private storeService: StoreService,
    private vacationService: VacationService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    const storeId = localStorage.getItem('storeId');
    this.getShop(storeId);
  }

  getShop(storeId: any) {
    this.storeService.getStore(storeId).subscribe((data: any) => {
      this.selectedStore = data.store.id + ' - ' + data.store.name;
      this.employees = data.store.employee;
    });
  }

  getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe((data: any) => {
      this.selectedEmployee.name = data.employee.name;
      this.selectedEmployee.surname = data.employee.surname;
      this.getVacationByEmployee(data.employee.id);
    });
  }

  getVacationByEmployee(employeId: number) {
    this.vacationService
      .getVacationByEmployeeId(employeId)
      .subscribe((data: any) => {
        console.log(data);
        this.vacations = data;
      });
  }

  onselectedEmployee() {
    this.getEmployee(this.selectedEmployee.id);
  }

  updateVacationStatus(vacation: Vacation): void {}

  openModal() {

    

    const dialogRef = this.dialog.open(VacationModalComponent, {
      width: '250px',
      data: this.selectedEmployee
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
    });
  }
}
