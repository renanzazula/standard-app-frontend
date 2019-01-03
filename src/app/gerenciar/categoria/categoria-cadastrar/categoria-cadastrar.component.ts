import {Component, OnInit} from '@angular/core';
import {Categoria} from "../../../model/categoria";
import {Subcategoria} from "../../../model/subcategoria";
import {Marca} from "../../../model/marca";
import {Medida} from "../../../model/medida";
import {ItensTipoMedida} from "../../../model/ItensTipoMedida";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MedidaService} from "../../../service/medida/medida.service";
import {AlertaService} from "../../../service/mensagens/alerta/alerta.service";
import {MarcaService} from "../../../service/marca/marca.service";
import {CategoriaService} from "../../../service/categoria/categoria.service";
import {SubCategoriaService} from "../../../service/subcategoria/sub-categoria.service";
import {MatDialog} from "@angular/material";
import {DialogComponent} from "../../../mensagens/dialog/dialog.component";
import {first} from "rxjs/operators";

@Component({
    selector: 'app-categoria-cadastrar',
    templateUrl: './categoria-cadastrar.component.html'
})
export class CategoriaCadastrarComponent implements OnInit {

    categoria: Categoria;
    subcategorias: Subcategoria[] = [];

    categoriaForm: FormGroup;
    submitted = false;
    update = false;
    disable = true;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private alertaService: AlertaService,
        private categoriaService: CategoriaService,
        private subcategoriaService: SubCategoriaService,
        private dialogComponente: MatDialog
    ) {
        this.categoriaForm = new FormGroup({
            codigo: new FormControl(''),
            nome: new FormControl('', Validators.required),
            descricao: new FormControl('', Validators.required),
        });
    }

    ngOnInit() {
        const codigo = this.activatedRoute.snapshot.params['codigo'];

        this.subcategoriaService.consultar().subscribe(
            (subcategoria: any[]) => {
                this.subcategorias = subcategoria;
            }, (error) => console.log(error)
        );

        if (codigo !== undefined) {
            this.update = true;
            this.disable = false;
            this.categoriaService.getById(codigo).subscribe(
                (categoria: Categoria) => {
                    this.categoriaForm.setValue({
                        codigo: categoria.codigo,
                        nome: categoria.nome,
                        descricao: categoria.descricao,
                        subcategoria: categoria.subcategorias,
                    });
                });
        }
    }

    onCadastrar() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.categoriaForm.invalid) {
            return;
        }

        this.categoriaService.cadastrar(this.categoriaForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertaService.success('Registrado com sucesso!', true);
                    this.router.navigate(['categoria/listar']);
                },
                error => {
                    this.alertaService.error(error);
                });
    }

    get f() {
        return this.categoriaForm.controls;
    }

    onAlterar() {
        const dialogRef = this.dialogComponente.open(DialogComponent, {
            data: {
                cabecalho: "Editar?",
                codigo: this.categoriaForm.value.codigo,
                nome: this.categoriaForm.value.nome,
                mensagem: "Deseja realmente efeteuar a edição?",
                tipo: "warning"
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {

                this.submitted = true;
                // stop here if form is invalid
                if (this.categoriaForm.invalid) {
                    return;
                }

                this.categoriaService.alterar(this.categoriaForm.value)
                    .pipe(first())
                    .subscribe(
                        data => {
                            this.alertaService.success('Alterado com sucesso!', true);
                            this.router.navigate(['categoria/listar']);
                        },
                        error => {
                            this.alertaService.error(error);
                        });
            }
        });
    }

    onCancelar() {
    }

    onExcluir(element: Categoria) {
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
                this.categoriaService.excluir(element.codigo)
                    .pipe(first())
                    .subscribe(
                        () => {
                            this.alertaService.success('Categoría foi desativada com sucesso!', true);
                            this.router.navigate(['categoria/listar']);
                        },
                        error => {
                            this.alertaService.error("Erro ao desativar categoría" + error);
                        });
            }
        });
    }

}
