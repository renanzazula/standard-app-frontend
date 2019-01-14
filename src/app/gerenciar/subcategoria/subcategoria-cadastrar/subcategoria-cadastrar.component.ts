import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertaService} from "../../../service/mensagens/alerta/alerta.service";
import {MatDialog} from "@angular/material";
import {first} from "rxjs/operators";
import {DialogComponent} from "../../../mensagens/dialog/dialog.component";
import {SubCategoriaService} from "../../../service/subcategoria/sub-categoria.service";
import {Subcategoria} from "../../../model/subcategoria";

@Component({
    selector: 'app-subcategoria-cadastrar',
    templateUrl: './subcategoria-cadastrar.component.html'
})
export class SubcategoriaCadastrarComponent implements OnInit {

    nome_page: string = 'Subcategoría';
    listar_page: string = 'subcategoria/listar';

    mensagem_excluir = "Deseja realmente efeteuar a exclusão?";
    cabecalho_excluir = "Excluir?";
    tipo_excluir = "danger";
    message_desativado_sucesso = this.nome_page + ' foi desativada com sucesso!';

    cabecalho_alterar = "Editar?";
    mensagem_alterar = "Deseja realmente efeteuar a edição?";
    tipo_alterar = "warning";
    message_alterado_sucesso = 'Alterado com sucesso!';

    message_registrado_sucesso = 'Registrado com sucesso!';
    messagem_erro = "Erro ao desativar "+ this.nome_page + " ";


    subcategoriaForm: FormGroup;
    submitted = false;
    update = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private subcategoriaService: SubCategoriaService,
        private alertaService: AlertaService,
        private dialogComponente: MatDialog
    ) {
        this.subcategoriaForm = this.formBuilder.group({
            codigo: [''],
            nome: ['', Validators.required],
            descricao: ['', Validators.required],
        });
    }

    ngOnInit() {
        const codigo = this.activatedRoute.snapshot.params['codigo'];

        if (codigo !== undefined) {
            this.update = true;
            this.subcategoriaService.getById(codigo).subscribe(
                (m: Subcategoria) => {
                    this.subcategoriaForm.setValue({
                        codigo: m.codigo,
                        nome: m.nome,
                        descricao: m.descricao
                    });
                });
        }
    }

    get f() {
        return this.subcategoriaForm.controls;
    }

    onCadastrar() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.subcategoriaForm.invalid) {
            return;
        }

        this.subcategoriaService.cadastrar(this.subcategoriaForm.value)
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
                codigo: this.subcategoriaForm.value.codigo,
                nome: this.subcategoriaForm.value.nome,
                mensagem: this.mensagem_alterar,
                tipo: this.tipo_alterar
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.submitted = true;
                // stop here if form is invalid
                if (this.subcategoriaForm.invalid) {
                    return;
                }

                this.subcategoriaService.alterar(this.subcategoriaForm.value)
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
        this.subcategoriaForm.reset();
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
                this.subcategoriaService.excluir(element.codigo)
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
