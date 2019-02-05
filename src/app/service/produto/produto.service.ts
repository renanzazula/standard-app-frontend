import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Produto} from "../../model/produto";
import {environment} from "../../../environments/environment";

@Injectable()
export class ProdutoService {

    constructor(private http: HttpClient) {
    }

    consultar() {
        return this.http.get<Produto[]>(`${environment.apiUrl}/produto`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/produto/${id}`);
    }

    cadastrar(produto: Produto, file: File) {
        return this.http.post(`${environment.apiUrl}/produto/${produto.codigo}`, produto);
    }

    alterar(produto: Produto) {
        return this.http.put(`${environment.apiUrl}/produto/${produto.codigo}`, produto);
    }

    excluir(id: number) {
        return this.http.delete(`${environment.apiUrl}/produto/${id}`);
    }


}
