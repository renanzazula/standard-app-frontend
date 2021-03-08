import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ProjectModule} from "../model/project.module";

@Injectable()
export class ManagementProjectService {

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get<ProjectModule[]>(`${environment.apiUrl}/project`);
  }

  getById(id:string){
    return this.http.get<ProjectModule[]>(`${environment.apiUrl}/project/${id}`);
  }

  new(project: ProjectModule){
    return this.http.post(`${environment.apiUrl}/project`, project);
  }

  update(project: ProjectModule){
    return this.http.put(`${environment.apiUrl}/project/${project.id}`, project);
  }

  updateStatus(project: ProjectModule){
    return this.http.post(`${environment.apiUrl}/project/${project.id}`, project);
  }
}
