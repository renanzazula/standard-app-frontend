import {Component, OnInit} from '@angular/core';
import {Fornecedor} from "../../../model/fornecedor";
import {FornecedorService} from "../../../service/fornecedor/fornecedor.service";

@Component({
    selector: 'app-fornecedor-listar',
    templateUrl: './fornecedor-listar.component.html',
})
export class FornecedorListarComponent implements OnInit {

    page_nome = "Fornecedor";
    nunhum_encontrado = "Nenhuma sucategoria encontrada!";
    fornecedores: Fornecedor[] = [];

    constructor(private forncedorService: FornecedorService) {
    }

    ngOnInit() {
        this.get();
    }

    get() {
        this.forncedorService.consultar().subscribe(
            (fornecedor: any[]) => {
                this.fornecedores = fornecedor;
            }, (error) => console.log(error)
        );
    }

}
