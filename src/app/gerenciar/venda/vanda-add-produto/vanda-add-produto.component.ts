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
import {VendaService} from "../../../service/venda/venda.service";
import {first} from "rxjs/operators";
import {Venda} from "../../../model/venda";

@Component({
    selector: 'app-vanda-add-produto',
    templateUrl: './vanda-add-produto.component.html'
})
export class VandaAddProdutoComponent implements OnInit {

    nome_page: string = 'Venda';
    venda_confirmar:  string = 'venda/confirmar';
    listar_page: string = 'venda/listar';

    mensagem_excluir = "Deseja realmente efeteuar a exclusão?";
    cabecalho_excluir = "Excluir?";
    tipo_excluir = "danger";
    message_desativado_sucesso = this.nome_page + ' foi desativada com sucesso!';

    cabecalho_alterar = "Editar?";
    mensagem_alterar = "Deseja realmente efeteuar a edição?";
    tipo_alterar = "warning";
    message_alterado_sucesso = 'Alterado com sucesso!';

    message_registrado_sucesso = 'Registrado com sucesso!';
    messagem_erro = "Erro ao desativar " + this.nome_page + " ";
    nunhum_encontrado = "Nenhuma produto encontrado!";
    temProduto = false;
    submitted = false;
    vendaAddProdutosFormGroup: FormGroup;
    formasdepagamentos: FormasDePagamento[];
    vendaHasItemProduto: VendaHasItemProduto[] = [];
    barcode: string;
    totalItens: number = 0;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private alertaService: AlertaService,
        private dialogComponente: MatDialog,
        private formasdepagamentoService: FormasDePagamentoService,
        private produtoService: ProdutoService,
        private vendaService: VendaService
    ) {
        this.vendaAddProdutosFormGroup = this.formBuilder.group({
            codigo: [''],
            barcode: [''],
            formadepagamento: ['', Validators.required],
            subtotal: [''],
            desconto: [''],
            totalPagar: [''],
            pagamento: [''],
            troco: [''],
            valorPago: [''],
            valorPendente:['']
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
            dialogRef.afterClosed().subscribe((result: ProdutoHasItensTipoMedida) => {
                if (result != null) {
                    let v = new VendaHasItemProduto();
                    v.quantidade = 1;
                    v.valorUnitario = p.precoVenda;
                    v.produtoHasItensTipoMedida = result;
                    this.totalItens = this.totalItens + p.precoVenda;
                    this.vendaHasItemProduto.push(v);
                }
            });
            this.vendaAddProdutosFormGroup.controls.barcode.setValue("");
            this.onChangeFormapagamento(this.vendaAddProdutosFormGroup.controls.formadepagamento.value);
            this.calculaTroco();

        });
    }

    stringify(o: any): string {
        return JSON.stringify(o);
    }

    remover(index){
        let v: VendaHasItemProduto = this.vendaHasItemProduto[index];
        this.totalItens = this.totalItens  - (v.valorUnitario * v.quantidade);
        this.vendaHasItemProduto.splice(index, 1);
        this.onChangeFormapagamento(this.vendaAddProdutosFormGroup.controls.formadepagamento.value);
        this.calculaTroco();
    }

    onChangeFormapagamento(value) {
        console.log("value:" + value);
        if( this.vendaHasItemProduto.length === 0){
          this.vendaAddProdutosFormGroup.controls.totalPagar.setValue(0);
          this.vendaAddProdutosFormGroup.controls.subtotal.setValue(0);
          this.vendaAddProdutosFormGroup.controls.desconto.setValue(0);
          this.vendaAddProdutosFormGroup.controls.pagamento.setValue(0);
        } else if(!!value && value !== undefined && value !== null ){
            var formadePagamento: FormasDePagamento = JSON.parse(value);
            var totalpagar = this.totalItens - ((formadePagamento.porcentagemDesconto/100) * this.totalItens);
            this.vendaAddProdutosFormGroup.controls.totalPagar.setValue(totalpagar);
            this.vendaAddProdutosFormGroup.controls.subtotal.setValue(totalpagar);
            this.vendaAddProdutosFormGroup.controls.desconto.setValue(formadePagamento.porcentagemDesconto);
            this.vendaAddProdutosFormGroup.controls.pagamento.setValue(totalpagar);
            this.vendaAddProdutosFormGroup.controls.valorPago.setValue(totalpagar);
        }
    }

    calculaTroco(){
        var totalpagar = this.vendaAddProdutosFormGroup.controls.totalPagar.value;
        var pagamento = this.vendaAddProdutosFormGroup.controls.pagamento.value;
        var valorPago = 0;
        if(pagamento >= totalpagar){
            valorPago = pagamento - totalpagar;
            this.vendaAddProdutosFormGroup.controls.troco.setValue(valorPago);
            this.vendaAddProdutosFormGroup.controls.valorPendente.setValue(0);
        }else{
            valorPago = totalpagar - pagamento;
            this.vendaAddProdutosFormGroup.controls.troco.setValue(0);
            this.vendaAddProdutosFormGroup.controls.valorPendente.setValue(valorPago);
        }
        this.vendaAddProdutosFormGroup.controls.valorPago.setValue(pagamento);
    }

  onAvancar(){
    this.submitted = true;

    // stop here if form is invalid
    // if (this.vendaAddProdutosFormGroup.invalid) {
    //   return;
    // }
    //

    console.log("value:" + this.vendaAddProdutosFormGroup.controls);


    var venda: Venda = new Venda();
    venda.formaDePagamento = JSON.parse(this.vendaAddProdutosFormGroup.controls.formadepagamento.value);
    venda.subtotal = this.vendaAddProdutosFormGroup.controls.subtotal.value;
    venda.desconto = this.vendaAddProdutosFormGroup.controls.desconto.value;
    venda.totalPagar = this.vendaAddProdutosFormGroup.controls.totalPagar.value;
    venda.pagamento = this.vendaAddProdutosFormGroup.controls.pagamento.value;
    venda.troco = this.vendaAddProdutosFormGroup.controls.troco.value;
    venda.valorPago = this.vendaAddProdutosFormGroup.controls.valorPago.value;
    venda.valorPendente = this.vendaAddProdutosFormGroup.controls.valorPendente.value;
    venda.vendaHasItemProduto = this.vendaHasItemProduto;

    this.vendaService.avancar(venda)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.listar_page]);
        },
        error => {
          this.alertaService.error(error);
        });
  }

}
