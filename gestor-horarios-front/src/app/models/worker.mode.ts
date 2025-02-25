// hours-worked.model.ts
export interface Worker {
    id: number;
    usuario_id: number;
    tienda_id: number;
    rol: string;
    fecha_ingreso: Date;
    contrato_id: number;
    name: string;
    surname: string;
}
