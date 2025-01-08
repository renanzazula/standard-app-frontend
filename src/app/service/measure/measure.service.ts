import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Measure} from "../../model/measure";
import {environment} from "../../../environments/environment";

@Injectable()
export class MeasureService {

    constructor(private http: HttpClient) {
    }

    findAll() {
        return this.http.get<Measure[]>(`${environment.apiPrivateUrl}/measure`);
    }

    findById(id: number) {
        return this.http.get(`${environment.apiPrivateUrl}/measure/${id}`);
    }

    save(measure: Measure) {
        return this.http.post(`${environment.apiPrivateUrl}/measure`, measure);
    }

    update(measure: Measure) {
        return this.http.put(`${environment.apiPrivateUrl}/measure/${measure.id}`, measure);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiPrivateUrl}/measure/${id}`);
    }

}
