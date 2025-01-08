import {Injectable} from '@angular/core';
import {Domain} from "../../model/domain";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DomainService {


  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Domain[]>(`${environment.apiPrivateUrl}/domain`);
  }

  findById(id: number) {
    return this.http.get(`${environment.apiPrivateUrl}/domain/${id}`);
  }

  save(domain: Domain) {
    return this.http.post(`${environment.apiPrivateUrl}/domain`, domain);
  }

  update(domain: Domain) {
    return this.http.put(`${environment.apiPrivateUrl}/domain/${domain.id}`, domain);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiPrivateUrl}/domain/${id}`);
  }
}
