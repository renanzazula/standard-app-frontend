import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Marca} from "../../../model/marca";
import {MarcaService} from "../../../service/marca/marca.service";
import {DialogComponent} from "../../../mensagens/dialog/dialog.component";
import {MatDialog} from "@angular/material";
import {first} from "rxjs/operators";
import {AlertaService} from "../../../service/mensagens/alerta/alerta.service";

import {Router} from "@angular/router";


@Component({
    selector: 'app-marca-lista',
    templateUrl: './marca-lista.component.html'
})
export class MarcaListaComponent implements OnInit {

    marcaChange = new EventEmitter<void>();
    marcas: Marca[] = [];

    constructor(
        private router: Router,
        private marcaService: MarcaService) {
    }

    ngOnInit() {
        this.marcaChange.subscribe(
            () => {
                this.get();
            }
        );
        this.get();
    }

    get(){
        this.marcaService.consultar().subscribe(
            (marca: any[]) => {
                this.marcas = marca;
            }, (error) => console.log(error)
        );
    }




}
