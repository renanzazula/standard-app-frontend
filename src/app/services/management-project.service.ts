import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ProjectModule} from "../model/project.module";

@Injectable()
export class ManagementProjectService {

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get<ProjectModule[]>(`${environment.apiUrl}/project/management`);
  }

  getById(id:string){
    return this.http.get<ProjectModule[]>(`${environment.apiUrl}/project/management/${id}`);
  }

  new(project: ProjectModule){
    return this.http.post(`${environment.apiUrl}/project/management`, project);
  }

  update(project: ProjectModule){
    return this.http.put(`${environment.apiUrl}/project/management/${project.id}`, project);
  }

  updateStatus(project: ProjectModule){
    return this.http.post(`${environment.apiUrl}/project/management/${project.id}`, project);
  }
}
