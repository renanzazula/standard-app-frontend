import {Component, OnInit} from '@angular/core';
import {CategoriaService} from "../../../service/categoria/categoria.service";
import {Categoria} from "../../../model/categoria";

@Component({
    selector: 'app-categoria-listar',
    templateUrl: './categoria-listar.component.html'
})
export class CategoriaListarComponent implements OnInit {

    categorias: Categoria[] = [];

    constructor(private categoriaService: CategoriaService) {
    }

    ngOnInit() {
        this.get();
    }

    get() {
        this.categoriaService.consultar().subscribe(
            (categoria: any[]) => {
                this.categorias = categoria;
            }, (error) => console.log(error)
        );

    }

}
