import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeaderComponent} from './header/header.component';
import {MenuComponent} from "./menu/menu.component";
import {MatDialog, MatDialogModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {ManagementProjectComponent} from './management-project/management-project.component';
import {ProjectListComponent} from './management-project/project-list/project-list.component';
import {ProjectNewComponent} from './management-project/project-new/project-new.component';

import {routing} from "./app.routing";
import {ManagementProjectService} from "./services/management-project.service";


@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        MenuComponent,
        HeaderComponent,
        ManagementProjectComponent,
        ProjectListComponent,
        ProjectNewComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        routing
    ],
    entryComponents: [],
    providers: [MatDialog, ManagementProjectService],
    bootstrap: [AppComponent]
})
export class AppModule {


}
