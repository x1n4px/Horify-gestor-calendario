export interface Vacation {
    id: number;
    employeeId: number;
    start_date: Date;  // Puede ser un string (fecha en formato 'YYYY-MM-DD') o Date
    end_date: Date;    // Puede ser un string (fecha en formato 'YYYY-MM-DD') o Date
    status: 'pending' | 'approved' | 'rejected';  // Enum de los posibles estados
    created_at: Date;  // Fecha en que la solicitud fue creada
    updated_at: Date;  // Fecha de la última actualización de la solicitud
}