import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../service/store.service';
import { Employee } from '../../models/employee';
import { SeniorLaborPipe } from '../../pipes/senior-labor.pipe';

@Component({
  selector: 'app-employee',
  imports: [SeniorLaborPipe],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private storeService: StoreService) {}
  ngOnInit(): void {
    const storeId = localStorage.getItem('storeId');
    this.getShop(storeId)
  }

  getShop(storeId:any) {
    this.storeService.getStore(storeId).subscribe((data: any) => {
      this.employees = data.store.employee;
      console.log(this.employees)
    });
  }

  isInProbation(entryDate: any): boolean {
    const currentDate = new Date();
    const entry = new Date(entryDate);

    // Calcula la diferencia en meses
    let months = (currentDate.getFullYear() - entry.getFullYear()) * 12;
    months += currentDate.getMonth() - entry.getMonth();

    // Si la diferencia en meses es menor a 3, está en periodo de prueba
    return months < 3;
  }
}
