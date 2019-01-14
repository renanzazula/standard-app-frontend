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
    return this.http.get<FormasDePagamento[]>(`${environment.apiUrl}/formasDePagamento`);
  }

  getById(id: number) {
    return this.http.get(`${environment.apiUrl}/formasDePagamento/${id}`);
  }

  cadastrar(formasDepagamento: FormasDePagamento) {
    return this.http.post(`${environment.apiUrl}/formasDePagamento`, formasDepagamento);
  }

  alterar(formasDepagamento: FormasDePagamento) {
    return this.http.put(`${environment.apiUrl}/formasDePagamento/${formasDepagamento.codigo}`, formasDepagamento);
  }

  excluir(id: number) {
    return this.http.delete(`${environment.apiUrl}/formasDePagamento/${id}`);
  }
}
