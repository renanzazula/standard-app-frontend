import {Component, OnInit} from '@angular/core';
import {Marca} from "../../model/marca";
import {MarcaService} from "../../service/marca/marca.service";

@Component({
    selector: 'app-marca',
    templateUrl: './marca.component.html',
    providers:[MarcaService]
})
export class MarcaComponent implements OnInit {

    marcaParaEditar: Marca;

    constructor() {
    }

    ngOnInit() {
    }

    onAlterar(marca: Marca) {
        this.marcaParaEditar = marca;

    }

}
