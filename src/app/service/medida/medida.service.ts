import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Medida} from "../../model/medida";
import {environment} from "../../../environments/environment";

@Injectable()
export class MedidaService {

    constructor(private http: HttpClient) {
    }

    consultar() {
        return this.http.get<Medida[]>(`${environment.apiPrivateUrl}/medida`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiPrivateUrl}/medida/${id}`);
    }

    cadastrar(medida: Medida) {
        return this.http.post(`${environment.apiPrivateUrl}/medida`, medida);
    }

    alterar(medida: Medida) {
        return this.http.put(`${environment.apiPrivateUrl}/medida/${medida.codigo}`, medida);
    }

    excluir(id: number) {
        return this.http.delete(`${environment.apiPrivateUrl}/medida/${id}`);
    }

}
