import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Marca} from "../../model/marca";
import {environment} from "../../../environments/environment";

@Injectable()
export class MarcaService {

  constructor(private http: HttpClient) { }

  consultar() {
    return this.http.get<Marca[]>(`${environment.apiUrl}/marca`);
  }

  getById(id: number) {
    return this.http.get(`${environment.apiUrl}/marca/${id}`);
  }

  cadastrar(marca: Marca) {
    return this.http.post(`${environment.apiUrl}/marca`, marca);
  }

  alterar(marca: Marca) {
    return this.http.put(`${environment.apiUrl}/marca/${marca.codigo}`, marca);
  }

  excluir(id: number) {
    return this.http.delete(`${environment.apiUrl}/marca/${id}`);
  }

}
