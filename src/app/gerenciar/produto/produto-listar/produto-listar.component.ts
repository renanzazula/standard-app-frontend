import {Component, OnInit} from '@angular/core';
import {Produto} from "../../../model/produto";
import {ProdutoService} from "../../../service/produto/produto.service";

@Component({
  selector: 'app-produto-listar',
  templateUrl: './produto-listar.component.html'
})
export class ProdutoListarComponent implements OnInit {

  page_nome = "Produto";
  nunhum_encontrado = "Nenhum " + this.page_nome + " encontrado!";
  produtos: Produto[] = [];

  isCollapsed = false;
  expandedIndex: number;

  constructor(private produtoService: ProdutoService) {

    this.expandedIndex = -1;

  }

  ngOnInit() {


    this.get();
  }

  onCollaps(index: number) {

    this.expandedIndex = index === this.expandedIndex ? -1 : index;
  }


get() {
    this.produtoService.consultar().subscribe(
        (produto: Produto[]) => {
            this.produtos = produto;
        }, (error) => console.log(error)
    );
  }

}
