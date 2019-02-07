import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertaService} from "../../../service/mensagens/alerta/alerta.service";
import {MatDialog} from "@angular/material";
import {FormasDePagamento} from "../../../model/formasDePagamento";
import {FormasDePagamentoService} from "../../../service/formasDePagamento/formas-de-pagamento.service";
import {VendaHasItemProduto} from "../../../model/vendaHasItemProduto";
import {ProdutoService} from "../../../service/produto/produto.service";
import {ProdutoHasItensTipoMedida} from "../../../model/produtoHasItensTipoMedida";
import {Produto} from "../../../model/produto";
import {DialogTableComponent} from "../../../mensagens/dialogTable/dialog.table.component";

@Component({
  selector: 'app-vanda-add-produto',
  templateUrl: './vanda-add-produto.component.html'
})
export class VandaAddProdutoComponent implements OnInit {

  submitted = false;
  vendaAddProdutosFormGroup: FormGroup;
  formasdepagamentos: FormasDePagamento[];
  vendaHasItemProduto: VendaHasItemProduto[] = [];

  barcode: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertaService: AlertaService,
    private dialogComponente: MatDialog,
    private formasdepagamentoService: FormasDePagamentoService,
    private produtoService: ProdutoService
  ) {
    this.vendaAddProdutosFormGroup = this.formBuilder.group({
      codigo: [''],
      barcode: [''],
      formadepagamento: ['', Validators.required],
      pagamento: [''],
      troco: ['']
    });
  }

  ngOnInit() {
    this.formasdepagamentoService.consultar().subscribe(
      (formasDePagamento: any[]) => {
        this.formasdepagamentos = formasDePagamento;
      }, (error) => console.log(error)
    );
  }

  addProduto() {
    this.produtoService.getByBarcode(this.vendaAddProdutosFormGroup.controls.barcode.value).subscribe((p: Produto) => {
      const dialogRef = this.dialogComponente.open(DialogTableComponent, {
        data: {
          cabecalho: "Medida",
          codigo: "",
          nome: "",
          mensagem: "",
          tipo: "warning",
          produtoHasItensTipoMedida: p.produtoHasItensTipoMedida
        }
      });

      dialogRef.afterClosed().subscribe((result : ProdutoHasItensTipoMedida) => {
        if(result != null) {
            let v = new VendaHasItemProduto();
            v.quantidade = 1;
            v.valorUnitario = p.precoVenda;
            v.produtoHasItensTipoMedida= result;
            this.vendaHasItemProduto.push(v);
        }
      });
    });
  }

  stringify(o: any): string {
    return JSON.stringify(o);
  }

}
