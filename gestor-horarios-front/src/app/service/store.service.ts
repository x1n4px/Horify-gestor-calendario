import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(public http: HttpClient) { }

  getStore(id: number) {
    return this.http.get(`http://localhost:3001/api/store/${id}`);
  }
}
