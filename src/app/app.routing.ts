import {RouterModule, Routes} from '@angular/router';
import {ManagementProjectComponent} from "./management-project/management-project.component";
import {ProjectNewComponent} from "./management-project/project-new/project-new.component";
import {ProjectListComponent} from "./management-project/project-list/project-list.component";

const appRoutes: Routes = [
  {
    path: 'management/project', component: ManagementProjectComponent, children: [
      {path: 'new', component: ProjectNewComponent},
      {path: ':codigo/update', component: ProjectNewComponent},
      {path: 'list', component: ProjectListComponent},
    ]
  },
  // otherwise redirect to home
  {path: '**', redirectTo: ""}
];

export const routing = RouterModule.forRoot(appRoutes);
