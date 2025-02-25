import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(public http: HttpClient) { }

  getShop(id: number) {
    return this.http.get(`http://localhost:3001/api/shop/${id}`);
  }
}
