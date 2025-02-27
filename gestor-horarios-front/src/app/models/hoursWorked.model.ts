// hours-worked.model.ts
export interface WorkedHour {
    employee_id: number;
    store_id: number;
    creation_date: string;
    entry_time: string;
    departure_time: string;
    time: number;
  }
  