import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HoursWorked } from '../models/hoursWorked.model';

@Injectable({
  providedIn: 'root'
})
export class HoursWorkedService {

  constructor(public http: HttpClient) { }

  getHoursWorked(id: number) {
    return this.http.get<HoursWorked[]>(`http://localhost:3001/api/hoursWorked/${id}`);
  }

  saveHoursWorked(items:HoursWorked[]) {
    return this.http.post(`http://localhost:3001/api/hoursWorked`, items);
  }
}
