import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Brand} from "../../model/brand";
import {environment} from "../../../environments/environment";

@Injectable()
export class BrandService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Brand[]>(`${environment.apiPrivateUrl}/brand`);
  }

  findById(id: number) {
    return this.http.get(`${environment.apiPrivateUrl}/brand/${id}`);
  }

  save(brand: Brand) {
    return this.http.post(`${environment.apiPrivateUrl}/brand`, brand);
  }

  update(brand: Brand) {
    return this.http.put(`${environment.apiPrivateUrl}/brand/${brand.id}`, brand);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiPrivateUrl}/brand/${id}`);
  }

}
