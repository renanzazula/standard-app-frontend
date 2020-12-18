import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Subcategoria} from "../../model/subcategoria";

@Injectable()
export class SubCategoriaService {

    constructor(private http: HttpClient) {
    }

    consultar() {
        return this.http.get<Subcategoria[]>(`${environment.apiPrivateUrl}/subcategoria`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiPrivateUrl}/subcategoria/${id}`);
    }

    cadastrar(subcategoria: Subcategoria) {
        return this.http.post(`${environment.apiPrivateUrl}/subcategoria`, subcategoria);
    }

    alterar(subcategoria: Subcategoria) {
        return this.http.put(`${environment.apiPrivateUrl}/subcategoria/${subcategoria.codigo}`, subcategoria);
    }

    excluir(id: number) {
        return this.http.delete(`${environment.apiPrivateUrl}/subcategoria/${id}`);
    }

    getSubcategoriaByCategoriaId(id: number) {
        return this.http.get(`${environment.apiPrivateUrl}/subcategoria/categoria/${id}`);
    }
}
