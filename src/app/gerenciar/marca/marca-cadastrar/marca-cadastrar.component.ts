import {Component, OnInit} from '@angular/core';
import {Marca} from "../../../model/marca";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MarcaService} from "../../../service/marca/marca.service";
import {first} from "rxjs/operators";
import {AlertaService} from "../../../service/mensagens/alerta/alerta.service";

import {ActivatedRoute, Router} from "@angular/router";
import {DialogComponent} from "../../../mensagens/dialog/dialog.component";
import {MatDialog} from "@angular/material";


@Component({
    selector: 'app-marca-cadastrar',
    templateUrl: './marca-cadastrar.component.html'
})
export class MarcaCadastrarComponent implements OnInit {


    marcaForm: FormGroup;
    submitted = false;
    update = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private marcaService: MarcaService,
        private alertaService: AlertaService,
        private dialogComponente: MatDialog
    ) {
        this.marcaForm = this.formBuilder.group({
            codigo: [''],
            nome: ['', Validators.required],
            descricao: ['', Validators.required],
        });
    }

    ngOnInit() {
        const codigo = this.activatedRoute.snapshot.params['codigo'];

        if (codigo !== undefined) {
            this.update = true;
            this.marcaService.getById(codigo).subscribe(
                (m: Marca) => {
                    this.marcaForm.setValue({
                        codigo: m.codigo,
                        nome: m.nome,
                        descricao: m.descricao
                    });
                });
        }
    }

    get f() {
        return this.marcaForm.controls;
    }

    onCadastrar() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.marcaForm.invalid) {
            return;
        }

        this.marcaService.cadastrar(this.marcaForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertaService.success('Registrado com sucesso!', true);
                    this.router.navigate(['marca/listar']);
                },
                error => {
                    this.alertaService.error(error);
                });
    }

    onAlterar() {
        const dialogRef = this.dialogComponente.open(DialogComponent, {
            data: {
                cabecalho: "Editar?",
                codigo: this.marcaForm.value.codigo,
                nome: this.marcaForm.value.nome,
                mensagem: "Deseja realmente efeteuar a edição?",
                tipo: "warning"
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {

                this.submitted = true;
                // stop here if form is invalid
                if (this.marcaForm.invalid) {
                    return;
                }

                this.marcaService.alterar(this.marcaForm.value)
                    .pipe(first())
                    .subscribe(
                        data => {
                            this.alertaService.success('Alterado com sucesso!', true);
                            this.router.navigate(['marca/listar']);
                        },
                        error => {
                            this.alertaService.error(error);
                        });
            }
        });
    }


    onCancelar() {
        this.marcaForm.reset();
        this.submitted = false;
        this.update = false;
    }

    onExcluir(element: Marca) {
        const dialogRef = this.dialogComponente.open(DialogComponent, {
            data: {
                cabecalho: "Excluir?",
                codigo: element.codigo,
                nome: element.nome,
                mensagem: "Deseja realmente efeteuar a exclusão?",
                tipo: "danger"
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.marcaService.excluir(element.codigo)
                    .pipe(first())
                    .subscribe(
                        () => {
                            this.alertaService.success('Marca foi desativada com sucesso!', true);
                            this.router.navigate(['marca/listar']);
                        },
                        error => {
                            this.alertaService.error("Erro ao desativar Marca" + error);
                        });
            }
        });
    }
}
