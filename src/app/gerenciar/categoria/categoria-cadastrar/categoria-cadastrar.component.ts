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
import {Medida} from "../../../model/medida";

@Component({
    selector: 'app-categoria-cadastrar',
    templateUrl: './categoria-cadastrar.component.html'
})
export class CategoriaCadastrarComponent implements OnInit{

    categoriaForm: FormGroup;
    subcategorias: Subcategoria[] = [];
    checkboxArray: FormArray = new FormArray([]);

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
        this.mergeCheckbox([]);
        this.categoriaForm = this.formBuilder.group({
            codigo: [''],
            nome: ['', Validators.required],
            descricao: ['', Validators.required],
            subcategorias: this.checkboxArray
        });
    }

    ngOnInit() {
        const codigo = this.activatedRoute.snapshot.params['codigo'];
        if (codigo !== undefined) {
            this.update = true;
            this.disable = false;
            this.categoriaService.getById(codigo).subscribe(
                (categoria: Categoria) => {
                    this.mergeCheckbox(categoria.subcategorias);
                    this.categoriaForm.patchValue({
                        codigo: categoria.codigo,
                        nome: categoria.nome,
                        descricao: categoria.descricao,
                    });
                });
            this.categoriaForm.setControl('subcategorias', this.checkboxArray);
        }
    }

    mergeCheckbox(subcategoriasSelecionadas: Subcategoria[]){
        this.subcategoriaService.consultar().subscribe(
            (entry: any[]) => {
                entry.forEach((value, index) => {
                    var estado = false;
                    subcategoriasSelecionadas.forEach((v, i) => {
                        if(value.codigo === v.codigo){
                            estado = true;
                        }
                    });
                    this.subcategorias[index] = value;
                    this.checkboxArray.insert(index, new FormControl(estado))
                });
            }, (error) => console.log("ERROR" + error)
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


        let categoria = this.categoriaForm.value;
        categoria.subcategorias =selected;


        this.categoriaService.cadastrar(categoria)
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

                const selected = this.categoriaForm.value.subcategorias
                    .map((v, i) => v ? this.subcategorias[i] : null)
                    .filter(v => v !== null);

                let categoria = this.categoriaForm.value;
                categoria.subcategorias =selected;


                this.submitted = true;
                // stop here if form is invalid
                if (this.categoriaForm.invalid) {
                    return;
                }

                this.categoriaService.alterar(categoria)
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
