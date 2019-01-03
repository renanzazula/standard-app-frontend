import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertaService} from "../../../service/mensagens/alerta/alerta.service";
import {MedidaService} from "../../../service/medida/medida.service";
import {Medida} from "../../../model/medida";
import {Categoria} from "../../../model/categoria";
import {Subcategoria} from "../../../model/subcategoria";
import {Marca} from "../../../model/marca";
import {MarcaService} from "../../../service/marca/marca.service";
import {CategoriaService} from "../../../service/categoria/categoria.service";
import {SubCategoriaService} from "../../../service/subcategoria/sub-categoria.service";
import {first} from "rxjs/operators";
import {ItensTipoMedida} from "../../../model/ItensTipoMedida";
import {DialogComponent} from "../../../mensagens/dialog/dialog.component";
import {MatDialog} from "@angular/material";

@Component({
    selector: 'app-medida-cadastrar',
    templateUrl: './medida-cadastrar.component.html'
})
export class MedidaCadastrarComponent implements OnInit {

    categoria: Categoria;
    subcategoria: Subcategoria;
    categorias: Categoria[] = [];
    subcategorias: Subcategoria[] = [];
    marcas: Marca[] = [];
    marca: Marca;
    medida: Medida = new Medida();
    itensTipoMedida: ItensTipoMedida[] = [];

    medidaForm: FormGroup;
    submitted = false;
    update = false;
    disable = true;


    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private medidaService: MedidaService,
        private alertaService: AlertaService,
        private marcaService: MarcaService,
        private categoriaService: CategoriaService,
        private subcategoriaService: SubCategoriaService,
        private dialogComponente: MatDialog
    ) {
        this.medidaForm = new FormGroup({
            codigo: new FormControl(''),
            nome: new FormControl('', Validators.required),
            descricao: new FormControl('', Validators.required),
            categoria: new FormControl('', Validators.required),
            subcategoria: new FormControl({value: '', disabled: true}, Validators.required),
            marca: new FormControl('', Validators.required),
            valor: new FormControl(''),
        });


    }

    ngOnInit() {
        const codigo = this.activatedRoute.snapshot.params['codigo'];

        this.marcaService.consultar().subscribe(
            (marca: any[]) => {
                this.marcas = marca;
            }, (error) => console.log(error)
        );

        this.categoriaService.consultar().subscribe(
            (categoria: any[]) => {
                this.categorias = categoria;
            }, (error) => console.log(error)
        );

        if (codigo !== undefined) {
            this.update = true;
            this.disable = false;
            this.medidaService.getById(codigo).subscribe(
                (medida: Medida) => {
                    this.medidaForm.setValue({
                        codigo: medida.codigo,
                        nome: medida.nome,
                        descricao: medida.descricao,
                        categoria: this.stringify(medida.itensTipoMedida[0].categoria),
                        subcategoria: this.stringify(medida.itensTipoMedida[0].subcategoria),
                        marca: this.stringify(medida.itensTipoMedida[0].marca),
                        valor: ''
                    });
                    this.itensTipoMedida = medida.itensTipoMedida;
                    this.subcategorias = medida.itensTipoMedida[0].categoria.subcategorias;
                });
        }
    }

    onChange(value) {
        this.categoria = JSON.parse(value);
        this.subcategoriaService.getSubcategoriaByCategoriaId(this.categoria.codigo).subscribe(
            (subcategoria: any[]) => {
                this.subcategorias = subcategoria;
            }, (error) => console.log(error)
        );
        this.disable = false;
        this.medidaForm.get('subcategoria').setValue(this.subcategorias[0]);
    }

    stringify(o: any): string {
        return JSON.stringify(o);
    }

    onAdd() {
        this.itensTipoMedida.push(new ItensTipoMedida(this.medidaForm.get('valor').value));
        this.medidaForm.get('valor').setValue('');

    }

    onRemove(index) {
        this.itensTipoMedida.splice(index, 1);
    }

    onCadastrar() {

        this.submitted = true;

        // stop here if form is invalid
        if (this.medidaForm.invalid) {
            return;
        }
        this.medida = this.medidaForm.value;
        this.medida.categoria = JSON.parse(this.medidaForm.get('categoria').value);
        this.medida.subcategoria = JSON.parse(this.medidaForm.get('subcategoria').value);
        this.medida.marca = JSON.parse(this.medidaForm.get('marca').value);
        this.medida.itensTipoMedida = this.itensTipoMedida;
        this.medidaService.cadastrar(this.medida)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertaService.success('Registrado com sucesso!', true);
                    this.router.navigate(['medida/listar']);
                },
                error => {
                    this.alertaService.error(error);
                });
    }

    get f() {
        return this.medidaForm.controls;
    }


    onCancelar() {
        this.medidaForm = new FormGroup({
            codigo: new FormControl(''),
            nome: new FormControl('', Validators.required),
            descricao: new FormControl('', Validators.required),
            categoria: new FormControl('', Validators.required),
            subcategoria: new FormControl({value: '', disabled: true}, Validators.required),
            marca: new FormControl('', Validators.required),
            valor: new FormControl(''),
        });

        this.itensTipoMedida = [];
        this.submitted = false;
        this.update = false;
        this.disable = true;

        this.categorias = [];
        this.subcategorias = [];
        this.marcas = [];


        this.marcaService.consultar().subscribe(
            (marca: any[]) => {
                this.marcas = marca;
            }, (error) => console.log(error)
        );

        this.categoriaService.consultar().subscribe(
            (categoria: any[]) => {
                this.categorias = categoria;
            }, (error) => console.log(error)
        );
    }

    onExcluir(element: Medida) {
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
                this.medidaService.excluir(element.codigo)
                    .pipe(first())
                    .subscribe(
                        () => {
                            this.alertaService.success('Medida foi desativada com sucesso!', true);
                            this.router.navigate(['medida/listar']);
                        },
                        error => {
                            this.alertaService.error("Erro ao desativar Medida" + error);
                        });
            }
        });
    }

    onAlterar() {
        const dialogRef = this.dialogComponente.open(DialogComponent, {
            data: {
                cabecalho: "Editar?",
                codigo: this.medidaForm.value.codigo,
                nome: this.medidaForm.value.nome,
                mensagem: "Deseja realmente efeteuar a edição?",
                tipo: "warning"
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {

                this.submitted = true;
                // stop here if form is invalid
                if (this.medidaForm.invalid) {
                    return;
                }

                this.medida = new Medida();
                this.medida = this.medidaForm.value;
                this.medida.categoria = JSON.parse(this.medidaForm.get('categoria').value);
                this.medida.subcategoria = JSON.parse(this.medidaForm.get('subcategoria').value);
                this.medida.marca = JSON.parse(this.medidaForm.get('marca').value);
                this.medida.itensTipoMedida = this.itensTipoMedida;
                this.medidaService.alterar(this.medida)
                    .pipe(first())
                    .subscribe(
                        data => {
                            this.alertaService.success('Alterado com sucesso!', true);
                            this.router.navigate(['medida/listar']);
                        },
                        error => {
                            this.alertaService.error(error);
                        });
            }
        });
    }

}
