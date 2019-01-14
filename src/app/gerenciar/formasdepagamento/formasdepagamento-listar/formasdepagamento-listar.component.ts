import { Component, OnInit } from '@angular/core';
import {Subcategoria} from "../../../model/subcategoria";
import {SubCategoriaService} from "../../../service/subcategoria/sub-categoria.service";
import {FormasDePagamentoService} from "../../../service/formasDePagamento/formas-de-pagamento.service";
import {FormasDePagamento} from "../../../model/formasDePagamento";

@Component({
  selector: 'app-formasdepagamento-listar',
  templateUrl: './formasdepagamento-listar.component.html',
})
export class FormasdepagamentoListarComponent implements OnInit {

  page_nome = "Formas de Pagamento";
  nunhum_encontrado = "Nenhuma sucategoria encontrada!";
  formasdepagamentos: FormasDePagamento[] = [];

  constructor(private formasDePagamentoService: FormasDePagamentoService) {
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.formasDePagamentoService.consultar().subscribe(
        (formasDePagamento: any[]) => {
          this.formasdepagamentos = formasDePagamento;
        }, (error) => console.log(error)
    );
  }

}
