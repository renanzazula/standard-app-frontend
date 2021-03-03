import {Component, EventEmitter, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProjectModule} from "../../model/project.module";
import {ManagementProjectService} from "../../services/management-project.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {


  projectsChange = new EventEmitter<void>();
  projects: ProjectModule[] = [];

  constructor(
    private router: Router,
    private managementProjectService : ManagementProjectService) {
  }

  ngOnInit() {

    var p = new ProjectModule();
    p.id="0";
    p.name="name";
    p.status="online";
    p.createBy="create By";
    p.createOn="create On";
    p.updateBy="update By";
    p.updateOn="update On";


    this.projects.push(p);

    this.projectsChange.subscribe(
      () => {
        this.get();
      }
    );
    this.get();
  }

  get(){
    // this.managementProjectService.get().subscribe(
    //   (project: any[]) => {
    //     this.projects = project;
    //   }, (error) => console.log(error)
    // );
  }

}
