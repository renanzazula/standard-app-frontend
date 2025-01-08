import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../environments/environment";
import {Provider} from "../../model/provider";

@Injectable()
export class ProviderService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Provider[]>(`${environment.apiPrivateUrl}/provider`);
  }

  findById(id: number) {
    return this.http.get(`${environment.apiPrivateUrl}/provider/${id}`);
  }

  save(provider: Provider) {
    return this.http.post(`${environment.apiPrivateUrl}/provider`, provider);
  }

  update(provider: Provider) {
    return this.http.put(`${environment.apiPrivateUrl}/provider/${provider.id}`, provider);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiPrivateUrl}/provider/${id}`);
  }
}
