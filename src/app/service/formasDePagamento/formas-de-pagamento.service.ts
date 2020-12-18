import { Injectable } from '@angular/core';
import {FormasDePagamento} from "../../model/formasDePagamento";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FormasDePagamentoService {

  constructor(private http: HttpClient) { }

  consultar() {
    return this.http.get<FormasDePagamento[]>(`${environment.apiPrivateUrl}/formasDePagamento`);
  }

  getById(id: number) {
    return this.http.get(`${environment.apiPrivateUrl}/formasDePagamento/${id}`);
  }

  cadastrar(formasDepagamento: FormasDePagamento) {
    return this.http.post(`${environment.apiPrivateUrl}/formasDePagamento`, formasDepagamento);
  }

  alterar(formasDepagamento: FormasDePagamento) {
    return this.http.put(`${environment.apiPrivateUrl}/formasDePagamento/${formasDepagamento.codigo}`, formasDepagamento);
  }

  excluir(id: number) {
    return this.http.delete(`${environment.apiPrivateUrl}/formasDePagamento/${id}`);
  }
}
