import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Subcategory} from "../../model/subcategory";

@Injectable()
export class SubcategoryService {

    constructor(private http: HttpClient) {
    }

    findAll() {
       console.log("find all")
      console.log(this.http.get<Subcategory[]>(`${environment.apiPrivateUrl}/subcategory`));

        return this.http.get<Subcategory[]>(`${environment.apiPrivateUrl}/subcategory`);
    }

    findById(id: number) {
        return this.http.get(`${environment.apiPrivateUrl}/subcategory/${id}`);
    }

    save(subcategory: Subcategory) {
        return this.http.post(`${environment.apiPrivateUrl}/subcategory`, subcategory);
    }

    update(subcategory: Subcategory) {
        return this.http.put(`${environment.apiPrivateUrl}/subcategory/${subcategory.id}`, subcategory);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiPrivateUrl}/subcategory/${id}`);
    }

    findSubCategoryByCategory(id: number) {
        return this.http.get(`${environment.apiPrivateUrl}/subcategory/category/${id}`);
    }
}
