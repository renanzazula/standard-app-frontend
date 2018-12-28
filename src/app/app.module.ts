import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeaderComponent} from './header/header.component';
import {MenuComponent} from "./menu/menu.component";
import {MarcaComponent} from './gerenciar/marca/marca.component';
import {MarcaListaComponent} from './gerenciar/marca/marca-lista/marca-lista.component';
import {DialogComponent} from "./mensagens/dialog/dialog.component";
import {MatDialog, MatDialogModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MarcaCadastrarComponent} from './gerenciar/marca/marca-cadastrar/marca-cadastrar.component';
import {AlertaComponent} from './mensagens/alerta/alerta.component';
import {AlertaService} from "./service/mensagens/alerta/alerta.service";
import {routing} from "./app.routing";
import {MarcaService} from "./service/marca/marca.service";



@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        HeaderComponent,
        MenuComponent,
        HeaderComponent,
        MarcaComponent,
        MarcaListaComponent,
        MarcaCadastrarComponent,
        DialogComponent,
        AlertaComponent
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
    entryComponents: [DialogComponent],
    providers: [AlertaService, MarcaService, MatDialog],
    bootstrap: [AppComponent]
})
export class AppModule {


}
