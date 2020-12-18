import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Categoria} from "../../model/categoria";

@Injectable()
export class CategoriaService {


    constructor(private http: HttpClient) {
    }

    consultar() {
        return this.http.get<Categoria[]>(`${environment.apiPrivateUrl}/categoria`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiPrivateUrl}/categoria/${id}`);
    }

    cadastrar(categoria: Categoria) {
        return this.http.post(`${environment.apiPrivateUrl}/categoria`, categoria);
    }

    alterar(categoria: Categoria) {
        return this.http.put(`${environment.apiPrivateUrl}/categoria/${categoria.codigo}`, categoria);
    }

    excluir(id: number) {
        return this.http.delete(`${environment.apiPrivateUrl}/categoria/${id}`);
    }
}
