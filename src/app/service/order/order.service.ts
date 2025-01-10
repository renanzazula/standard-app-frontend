import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Order} from "../../model/order";

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {
  }

  create(order: Order) {
    return this.http.post(`${environment.apiPrivateUrl}/order/create`, order);
  }

  updateStatusOrder(order: Order) {
    return this.http.post(`${environment.apiPrivateUrl}/order/confirm`, order);
  }

  getOrderById(id: number) {
    return this.http.get(`${environment.apiPrivateUrl}/order/${id}/confirm`);
  }


}
