import {Component} from '@angular/core';
import {MarcaService} from "../../service/marca/marca.service";
import {GerenciarMarcaService} from "./gerenciar-marca.service";

@Component({
    selector: 'app-marca',
    templateUrl: './marca.component.html',
    providers: [MarcaService, GerenciarMarcaService]
})
export class MarcaComponent {


    constructor() {
    }

}
