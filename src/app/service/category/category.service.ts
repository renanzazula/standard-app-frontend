import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../model/category";

@Injectable()
export class CategoryService {


    constructor(private http: HttpClient) {
    }

    findAll() {
        return this.http.get<Category[]>(`${environment.apiPrivateUrl}/category`);
    }

    findById(id: number) {
        return this.http.get(`${environment.apiPrivateUrl}/category/${id}`);
    }

    save(category: Category) {
        return this.http.post(`${environment.apiPrivateUrl}/category`, category);
    }

    update(category: Category) {
        return this.http.put(`${environment.apiPrivateUrl}/category/${category.id}`, category);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiPrivateUrl}/category/${id}`);
    }
}
