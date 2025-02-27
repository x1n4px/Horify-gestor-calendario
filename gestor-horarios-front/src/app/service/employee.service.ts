import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public http: HttpClient) { }

  getEmployee(id: number) {
    return this.http.get(`http://localhost:3001/api/employee/${id}`);
  }

}
