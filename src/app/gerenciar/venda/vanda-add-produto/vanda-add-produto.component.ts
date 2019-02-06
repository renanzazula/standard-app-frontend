import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertaService} from "../../../service/mensagens/alerta/alerta.service";
import {MatDialog} from "@angular/material";
import {FormasDePagamento} from "../../../model/formasDePagamento";
import {FormasDePagamentoService} from "../../../service/formasDePagamento/formas-de-pagamento.service";

@Component({
  selector: 'app-vanda-add-produto',
  templateUrl: './vanda-add-produto.component.html'
})
export class VandaAddProdutoComponent implements OnInit {

  submitted = false;
  vendaAddProdutos: FormGroup;
  formasdepagamentos: FormasDePagamento[];


  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private formBuilder: FormBuilder,
      private alertaService: AlertaService,
      private dialogComponente: MatDialog,
      private formasdepagamentoService: FormasDePagamentoService

  ) {
      this.vendaAddProdutos = this.formBuilder.group({
      codigo: [''],
      codigoProduto: [''],
      formadepagamento: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.formasdepagamentoService.consultar().subscribe(
      (formasDePagamento: any[]) => {
        this.formasdepagamentos = formasDePagamento;
      }, (error) => console.log(error)
    );

  }

}
