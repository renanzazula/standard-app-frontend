import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Marca} from "../../model/marca";
import {environment} from "../../../environments/environment";

@Injectable()
export class MarcaService {

  constructor(private http: HttpClient) { }

  consultar() {
    return this.http.get<Marca[]>(`${environment.apiPrivateUrl}/marca`);
  }

  getById(id: number) {
    return this.http.get(`${environment.apiPrivateUrl}/marca/${id}`);
  }

  cadastrar(marca: Marca) {
    return this.http.post(`${environment.apiPrivateUrl}/marca`, marca);
  }

  alterar(marca: Marca) {
    return this.http.put(`${environment.apiPrivateUrl}/marca/${marca.codigo}`, marca);
  }

  excluir(id: number) {
    return this.http.delete(`${environment.apiPrivateUrl}/marca/${id}`);
  }

}
