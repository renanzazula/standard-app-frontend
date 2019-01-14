import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {AlertaService} from "../../../service/mensagens/alerta/alerta.service";
import {MatDialog} from "@angular/material";

import {first} from "rxjs/operators";
import {DialogComponent} from "../../../mensagens/dialog/dialog.component";
import {FormasDePagamentoService} from "../../../service/formasDePagamento/formas-de-pagamento.service";
import {FormasDePagamento} from "../../../model/formasDePagamento";

@Component({
    selector: 'app-formasdepagamento-cadastrar',
    templateUrl: './formasdepagamento-cadastrar.component.html',
})
export class FormasdepagamentoCadastrarComponent implements OnInit {

    nome_page: string = 'Formas de Pagamento';
    listar_page: string = 'formasdepagamento/listar';

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


    formasdepagamentoForm: FormGroup;
    submitted = false;
    update = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private formasDePagamentoService: FormasDePagamentoService,
        private alertaService: AlertaService,
        private dialogComponente: MatDialog
    ) {
        this.formasdepagamentoForm = this.formBuilder.group({
            codigo: [''],
            nome: ['', Validators.required],
            descricao: ['', Validators.required],
            porcentagemDesconto: ['0', Validators.required],
        });
    }

    ngOnInit() {
        const codigo = this.activatedRoute.snapshot.params['codigo'];

        if (codigo !== undefined) {
            this.update = true;
            this.formasDePagamentoService.getById(codigo).subscribe(
                (m: FormasDePagamento) => {
                    this.formasdepagamentoForm.setValue({
                        codigo: m.codigo,
                        nome: m.nome,
                        descricao: m.descricao,
                        porcentagemDesconto: m.porcentagemDesconto
                    });
                });
        }
    }

    get f() {
        return this.formasdepagamentoForm.controls;
    }

    onCadastrar() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.formasdepagamentoForm.invalid) {
            return;
        }

        this.formasDePagamentoService.cadastrar(this.formasdepagamentoForm.value)
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
                codigo: this.formasdepagamentoForm.value.codigo,
                nome: this.formasdepagamentoForm.value.nome,
                mensagem: this.mensagem_alterar,
                tipo: this.tipo_alterar
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.submitted = true;
                // stop here if form is invalid
                if (this.formasdepagamentoForm.invalid) {
                    return;
                }

                this.formasDePagamentoService.alterar(this.formasdepagamentoForm.value)
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
        this.formasdepagamentoForm.reset();
        this.submitted = false;
        this.update = false;

    }

    onExcluir(element: FormasDePagamento) {
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
                this.formasDePagamentoService.excluir(element.codigo)
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
