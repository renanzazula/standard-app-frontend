import {Component, OnInit} from '@angular/core';
import {Produto} from "../../../model/produto";
import {ProdutoService} from "../../../service/produto/produto.service";
import {Fornecedor} from "../../../model/fornecedor";
import {Medida} from "../../../model/medida";
import {Categoria} from "../../../model/categoria";
import {Subcategoria} from "../../../model/subcategoria";
import {Marca} from "../../../model/marca";
import {MedidaService} from "../../../service/medida/medida.service";
import {ItensTipoMedida} from "../../../model/ItensTipoMedida";

@Component({
  selector: 'app-produto-listar',
  templateUrl: './produto-listar.component.html'
})
export class ProdutoListarComponent implements OnInit {

  page_nome = "Produto";
  nunhum_encontrado = "Nenhum " + this.page_nome + " encontrado!";
  produtos: Produto[] = [];
  itensM: Medida[] = [];

  isCollapsed = false;
  expandedIndex: number;

  constructor(private produtoService: ProdutoService, private itensService: MedidaService) {

    this.expandedIndex = -1;

    this.itensService.consultar().subscribe(
      (items: any[]) => {
        this.itensM = items;
      }, (error) => console.log(error)
    );

  }

  ngOnInit() {


    this.get();
  }

  onCollaps(index: number) {

    this.expandedIndex = index === this.expandedIndex ? -1 : index;
  }


get() {

    var p = new Produto();
    p.codigo = 0;
    p.barCode = "barCode";
    p.nome = "nome";
    p.descricao = "descricao";

    p.precoCusto = 10.0;
    p.porcentagem = 10.0;
    p.precoVenda = 10.0;

    p.porcentagemDesconto = 10.0;
    p.desconto = 10.0;
    p.precoOferta = 10.0;
    p.peso = 10.0;
    p.preco = 10.0;


    var fornecedor = new Fornecedor();
    fornecedor.codigo = 0;
    fornecedor.nome = "nome"

    p.fornecedor = fornecedor;


    var categoria = new Categoria();
    categoria.codigo = 0;
    categoria.nome = "nome"
    p.categoria = categoria;

    var sub = new Subcategoria();
    sub.codigo = 0;
    sub.nome = "nome"
    p.subcategoria = sub;

    var marca = new Marca(0, "nome", "des", "");
    p.marca = marca;

    var i = new ItensTipoMedida("0")
    i.codigo = 0;

    var i2 = new ItensTipoMedida("1")
    i2.codigo = 2;

    var medida = new Medida();
    medida.codigo = 0;
    medida.nome = "nome"
    medida.itensTipoMedida = [i,i2];
    p.medida = medida;
    // p.dominios = [new Dominio(0, "nome", "des", "","")];


    this.produtos = [p, p, p];

  }

}
