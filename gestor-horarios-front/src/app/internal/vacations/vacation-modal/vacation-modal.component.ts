import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../../models/employee';
@Component({
  selector: 'app-vacation-modal',
  imports: [MatDialogModule, MatButtonModule, CommonModule, FormsModule],
  templateUrl: './vacation-modal.component.html',
  styleUrl: './vacation-modal.component.css',
})
export class VacationModalComponent {
  vacation = {
    start_date: '',
    end_date: '',
    status: 'pending', // valor por defecto
  };

  employee?: Employee

  constructor(
    public dialogRef: MatDialogRef<VacationModalComponent>, // Para controlar la vista del modal
    @Inject(MAT_DIALOG_DATA) public data: any // Para recibir datos del componente que abre el modal
  ) {
    this.employee = data;
  }

  // Método para cerrar el modal
  closeDialog(): void {
    this.dialogRef.close();
  }

  // Método para guardar los datos de las vacaciones
  submitVacation(): void {
    console.log(this.employee)
    console.log('Solicitud de vacaciones guardada:', this.vacation);
  }
}
