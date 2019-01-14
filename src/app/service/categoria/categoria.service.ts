import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Categoria} from "../../model/categoria";

@Injectable()
export class CategoriaService {


    constructor(private http: HttpClient) {
    }

    consultar() {
        return this.http.get<Categoria[]>(`${environment.apiUrl}/categoria`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/categoria/${id}`);
    }

    cadastrar(categoria: Categoria) {
        return this.http.post(`${environment.apiUrl}/categoria`, categoria);
    }

    alterar(categoria: Categoria) {
        return this.http.put(`${environment.apiUrl}/categoria/${categoria.codigo}`, categoria);
    }

    excluir(id: number) {
        return this.http.delete(`${environment.apiUrl}/categoria/${id}`);
    }
}
