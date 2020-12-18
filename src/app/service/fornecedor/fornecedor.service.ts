import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../environments/environment";
import {Fornecedor} from "../../model/fornecedor";

@Injectable()
export class FornecedorService {

  constructor(private http: HttpClient) { }

  consultar() {
    return this.http.get<Fornecedor[]>(`${environment.apiPrivateUrl}/fornecedor`);
  }

  getById(id: number) {
    return this.http.get(`${environment.apiPrivateUrl}/fornecedor/${id}`);
  }

  cadastrar(formasDepagamento: Fornecedor) {
    return this.http.post(`${environment.apiPrivateUrl}/fornecedor`, formasDepagamento);
  }

  alterar(formasDepagamento: Fornecedor) {
    return this.http.put(`${environment.apiPrivateUrl}/fornecedor/${formasDepagamento.codigo}`, formasDepagamento);
  }

  excluir(id: number) {
    return this.http.delete(`${environment.apiPrivateUrl}/fornecedor/${id}`);
  }
}
