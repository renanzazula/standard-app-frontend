import {Component, OnInit} from '@angular/core';
import {DominioService} from "../../../service/dominio/dominio.service";
import {Dominio} from "../../../model/dominio";

@Component({
    selector: 'app-dominio-listar',
    templateUrl: './dominio-listar.component.html'
})
export class DominioListarComponent implements OnInit {

    page_nome = "Dominios";
    nunhum_encontrado = "Nenhuma " + this.page_nome + " encontrada!";
    dominios: Dominio[] = [];

    constructor(private dominioService: DominioService) {
    }

    ngOnInit() {
        this.get();
    }

    get() {
        this.dominioService.consultar().subscribe(
            (fornecedor: any[]) => {
                this.dominios = fornecedor;
            }, (error) => console.log(error)
        );
    }

}
