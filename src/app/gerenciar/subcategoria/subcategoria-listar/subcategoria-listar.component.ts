import {Component, OnInit} from '@angular/core';
import {Subcategoria} from "../../../model/subcategoria";
import {SubCategoriaService} from "../../../service/subcategoria/sub-categoria.service";

@Component({
    selector: 'app-subcategoria-listar',
    templateUrl: './subcategoria-listar.component.html'
})
export class SubcategoriaListarComponent implements OnInit {
    page_nome = "Subcategoría";
    nunhum_encontrado = "Nenhuma sucategoria encontrada!";
    subcategorias: Subcategoria[] = [];

    constructor(private subcategoriaservice: SubCategoriaService) {
    }

    ngOnInit() {
        this.get();
    }

    get() {
        this.subcategoriaservice.consultar().subscribe(
            (subcategoria: any[]) => {
                this.subcategorias = subcategoria;
            }, (error) => console.log(error)
        );
    }

}
