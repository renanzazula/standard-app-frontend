import {AfterContentInit, Component, OnInit} from '@angular/core';
import {Categoria} from "../../../model/categoria";
import {Subcategoria} from "../../../model/subcategoria";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertaService} from "../../../service/mensagens/alerta/alerta.service";
import {CategoriaService} from "../../../service/categoria/categoria.service";
import {SubCategoriaService} from "../../../service/subcategoria/sub-categoria.service";
import {MatDialog} from "@angular/material";
import {DialogComponent} from "../../../mensagens/dialog/dialog.component";
import {first} from "rxjs/operators";

@Component({
    selector: 'app-categoria-cadastrar',
    templateUrl: './categoria-cadastrar.component.html'
})
export class CategoriaCadastrarComponent implements OnInit{

    categoria: Categoria;
    categoriaForm: FormGroup;
    subcategorias: Subcategoria[] = [];
    checkboxGroup: FormGroup;

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
        let checkboxArray = new FormArray([]);
        this.subcategoriaService.consultar().subscribe(
            (subcategoria: Subcategoria[]) => {
                subcategoria.forEach((value, index) => {
                    checkboxArray.insert(index, new FormControl(false))
                });
            }, (error) => console.log(error)
        )
        this.categoriaForm = formBuilder.group({
            codigo: [''],
            nome: ['', Validators.required],
            descricao: ['', Validators.required],
            subcategorias:  checkboxArray
    });
    }

    ngOnInit() {
        this.subcategoriaService.consultar().subscribe(
            (subcategoria: any[]) => {
                this.subcategorias = subcategoria;
            }, (error) => console.log(error)
        );
    }


    onCadastrar() {

        const selected = this.categoriaForm.value.subcategorias
            .map((v, i) => v ? this.subcategorias[i] : null)
            .filter(v => v !== null);

        this.submitted = true;
        // stop here if form is invalid
        if (this.categoriaForm.invalid) {
            return;
        }
        this.categoria = new Categoria();
        this.categoria = this.categoriaForm.value;
        this.categoria.subcategorias =selected;

        console.log(this.categoria);

        this.categoriaService.cadastrar(this.categoria)
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
