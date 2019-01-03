import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Medida} from "../../model/medida";
import {environment} from "../../../environments/environment";

@Injectable()
export class MedidaService {

    constructor(private http: HttpClient) {
    }

    consultar() {
        return this.http.get<Medida[]>(`${environment.apiUrl}/medida`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/medida/${id}`);
    }

    cadastrar(medida: Medida) {
        console.log(medida);
        return this.http.post(`${environment.apiUrl}/medida`, medida);
    }

    alterar(medida: Medida) {
        return this.http.put(`${environment.apiUrl}/medida/${medida.codigo}`, medida);
    }

    excluir(id: number) {
        return this.http.delete(`${environment.apiUrl}/medida/${id}`);
    }

}
