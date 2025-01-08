import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../model/product';
import {environment} from '../../../environments/environment';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {
  }

  findAll() {
    return this.http.get<Product[]>(`${environment.apiPrivateUrl}/product`);
  }

  findById(id: number) {
    return this.http.get(`${environment.apiPrivateUrl}/product/${id}`);
  }

  getByBarcode(barcode: string) {
    return this.http.get(`${environment.apiPrivateUrl}/product/addProduct/${barcode}`);
  }

  save(product: Product) {
    return this.http.post(`${environment.apiPrivateUrl}/product`, product);
  }

  update(product: Product) {
    return this.http.put(`${environment.apiPrivateUrl}/product/${product.id}`, product);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiPrivateUrl}/product/${id}`);
  }

  calculateDiscount(percent: number, amount: number, totalOrder: number) {
    return this.http.get(`${environment.apiPrivateUrl}/product/calculate/discount/${percent}/${amount}/${totalOrder}`);
  }

  calculateOrderAmount(percent: number, priceCost: number) {
    return this.http.get(`${environment.apiPrivateUrl}/calculate/orderAmount/${percent}/${priceCost}`);
  }


}
