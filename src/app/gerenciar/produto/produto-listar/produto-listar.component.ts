import {Component, OnInit} from '@angular/core';
import {Produto} from "../../../model/produto";
import {ProdutoService} from "../../../service/produto/produto.service";

@Component({
    selector: 'app-produto-listar',
    templateUrl: './produto-listar.component.html'
})
export class ProdutoListarComponent implements OnInit {

    page_nome = "Produto";
    nunhum_encontrado = "Nenhum "+this.page_nome+" encontrado!";
    produtos: Produto[] = [];

    constructor(private produtoService: ProdutoService) {
    }

    ngOnInit() {
        this.get();
    }

    get() {
        this.produtoService.consultar().subscribe(
            (produto: any[]) => {
                this.produtos = produto;
            }, (error) => console.log(error)
        );
    }

}
