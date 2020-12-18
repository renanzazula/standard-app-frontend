import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Venda} from "../../model/venda";

@Injectable()
export class VendaService {

  constructor(private http: HttpClient) {
  }

  avancar(venda: Venda) {
    return this.http.post(`${environment.apiPrivateUrl}/venda/create`, venda);
  }

  confirmar(venda: Venda) {
    return this.http.post(`${environment.apiPrivateUrl}/venda/confirmar`, venda);
  }

  getVendaById(codigo: number) {
    return this.http.get(`${environment.apiPrivateUrl}/venda/${codigo}/confirmar`);
  }
}
