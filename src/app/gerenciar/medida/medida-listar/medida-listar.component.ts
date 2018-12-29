import {Component, OnInit} from '@angular/core';
import {MedidaService} from "../../../service/medida/medida.service";
import {Medida} from "../../../model/medida";

@Component({
    selector: 'app-medida-listar',
    templateUrl: './medida-listar.component.html'
})
export class MedidaListarComponent implements OnInit {

    medidas: Medida[] = [];

    constructor(private medidaService: MedidaService) {
    }

    ngOnInit() {
        this.get();
    }

    get() {
        this.medidaService.consultar().subscribe(
            (medida: any[]) => {
                this.medidas = medida;
            }, (error) => console.log(error)
        );
    }

}
