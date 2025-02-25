// hours-worked.model.ts
export interface HoursWorked {
    empleado_id: number;
    tienda_id: number;
    fecha: string;
    hora_entrada: string;
    hora_salida: string;
    horas: number;
  }
  