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

    nome_page: string = 'Venda';
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
        private produtoService: ProdutoService
    ) {
        this.vendaAddProdutosFormGroup = this.formBuilder.group({
            codigo: [''],
            barcode: [''],
            formadepagamento: ['', Validators.required],
            desconto: [''],
            pagamento: [''],
            troco: [''],
            totalPagar: ['']
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
        });
    }

    stringify(o: any): string {
        return JSON.stringify(o);
    }

    remover(index){
        let v: VendaHasItemProduto = this.vendaHasItemProduto[index];
        this.totalItens = this.totalItens  - (v.valorUnitario * v.quantidade);
        this.vendaHasItemProduto.splice(index, 1);
    }

    onChangeCategoria(value) {
        var formadePagamento: FormasDePagamento = JSON.parse(value);
        this.vendaAddProdutosFormGroup.controls.totalPagar.setValue( this.totalItens - ((formadePagamento.porcentagemDesconto/100) * this.totalItens));
        this.vendaAddProdutosFormGroup.controls.desconto.setValue(formadePagamento.porcentagemDesconto);
    }

}
