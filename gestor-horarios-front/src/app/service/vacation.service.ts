import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  constructor(public http: HttpClient) { }
  
    getVacationByEmployeeId(employeeId: number) {
      return this.http.get(`http://localhost:3001/api/vacation/employee/${employeeId}`);
    }
}
