import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Categoria} from "../../model/categoria";
import {environment} from "../../../environments/environment";
import {Subcategoria} from "../../model/subcategoria";

@Injectable({
  providedIn: 'root'
})
export class SubCategoriaService {

  constructor(private http: HttpClient) {
  }

  consultar() {
    return this.http.get<Subcategoria[]>(`${environment.apiUrl}/subcategoria`);
  }

  getById(id: number) {
    console.log(id);
    return this.http.get(`${environment.apiUrl}/subcategoria/${id}`);
  }

  cadastrar(subcategoria: Subcategoria) {
    return this.http.post(`${environment.apiUrl}/subcategoria`, subcategoria);
  }

  alterar(subcategoria: Subcategoria) {
    return this.http.put(`${environment.apiUrl}/subcategoria/${subcategoria.codigo}`, subcategoria);
  }

  excluir(id: number) {
    return this.http.delete(`${environment.apiUrl}/subcategoria/${id}`);
  }

  getSubcategoriaByCategoriaId(id: number) {
    return this.http.get(`${environment.apiUrl}/subcategoria/categoria/${id}`);
  }
}
