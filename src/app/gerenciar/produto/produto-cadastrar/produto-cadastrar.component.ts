import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertaService} from "../../../service/mensagens/alerta/alerta.service";
import {MatDialog} from "@angular/material";
import {Subcategoria} from "../../../model/subcategoria";
import {first} from "rxjs/operators";
import {DialogComponent} from "../../../mensagens/dialog/dialog.component";
import {ProdutoService} from "../../../service/produto/produto.service";

@Component({
    selector: 'app-produto-cadastrar',
    templateUrl: './produto-cadastrar.component.html'
})
export class ProdutoCadastrarComponent implements OnInit {

    nome_page: string = 'Produto';
    listar_page: string = 'produto/listar';

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


    produtoForm: FormGroup;
    submitted = false;
    update = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private produtoService: ProdutoService,
        private alertaService: AlertaService,
        private dialogComponente: MatDialog
    ) {
        this.produtoForm = this.formBuilder.group({
            codigo: [''],
            nome: ['', Validators.required],
            descricao: ['', Validators.required],
        });
    }

    ngOnInit() {
        const codigo = this.activatedRoute.snapshot.params['codigo'];

        if (codigo !== undefined) {
            this.update = true;
            this.produtoService.getById(codigo).subscribe(
                (m: Subcategoria) => {
                    this.produtoForm.setValue({
                        codigo: m.codigo,
                        nome: m.nome,
                        descricao: m.descricao
                    });
                });
        }
    }

    get f() {
        return this.produtoForm.controls;
    }

    onCadastrar() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.produtoForm.invalid) {
            return;
        }

        this.produtoService.cadastrar(this.produtoForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertaService.success(this.message_registrado_sucesso, true);
                    this.router.navigate([this.listar_page]);
                },
                error => {
                    this.alertaService.error(error);
                });
    }

    onAlterar() {

        const dialogRef = this.dialogComponente.open(DialogComponent, {
            data: {
                cabecalho: this.cabecalho_alterar,
                codigo: this.produtoForm.value.codigo,
                nome: this.produtoForm.value.nome,
                mensagem: this.mensagem_alterar,
                tipo: this.tipo_alterar
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.submitted = true;
                // stop here if form is invalid
                if (this.produtoForm.invalid) {
                    return;
                }

                this.produtoService.alterar(this.produtoForm.value)
                    .pipe(first())
                    .subscribe(
                        data => {
                            this.alertaService.success(this.message_alterado_sucesso, true);
                            this.router.navigate([this.listar_page]);
                        },
                        error => {
                            this.alertaService.error(error);
                        });
            }
        });
    }

    onCancelar() {
        this.produtoForm.reset();
        this.submitted = false;
        this.update = false;
    }

    onExcluir(element: Subcategoria) {
        const dialogRef = this.dialogComponente.open(DialogComponent, {
            data: {
                cabecalho: this.cabecalho_excluir,
                codigo: element.codigo,
                nome: element.nome,
                mensagem: this.mensagem_excluir,
                tipo: this.tipo_excluir
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.produtoService.excluir(element.codigo)
                    .pipe(first())
                    .subscribe(
                        () => {
                            this.alertaService.success(this.message_desativado_sucesso, true);
                            this.router.navigate([this.listar_page]);
                        },
                        error => {
                            this.alertaService.error(this.messagem_erro + error);
                        });
            }
        });
    }
}
