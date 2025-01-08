import { Injectable } from '@angular/core';
import {PaymentMethod} from "../../model/paymentMethod";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<PaymentMethod[]>(`${environment.apiPrivateUrl}/paymentMethod`);
  }

  findById(id: number) {
    return this.http.get(`${environment.apiPrivateUrl}/paymentMethod/${id}`);
  }

  save(paymentMethod: PaymentMethod) {
    return this.http.post(`${environment.apiPrivateUrl}/paymentMethod`, paymentMethod);
  }

  update(paymentMethod: PaymentMethod) {
    return this.http.put(`${environment.apiPrivateUrl}/paymentMethod/${paymentMethod.id}`, paymentMethod);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiPrivateUrl}/paymentMethod/${id}`);
  }
}
