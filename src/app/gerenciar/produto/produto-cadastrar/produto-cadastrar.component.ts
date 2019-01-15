import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertaService} from "../../../service/mensagens/alerta/alerta.service";
import {MatDialog} from "@angular/material";
import {Subcategoria} from "../../../model/subcategoria";
import {first} from "rxjs/operators";
import {DialogComponent} from "../../../mensagens/dialog/dialog.component";
import {ProdutoService} from "../../../service/produto/produto.service";
import {Fornecedor} from "../../../model/fornecedor";
import {Medida} from "../../../model/medida";
import {Categoria} from "../../../model/categoria";
import {Marca} from "../../../model/marca";
import {FornecedorService} from "../../../service/fornecedor/fornecedor.service";
import {MedidaService} from "../../../service/medida/medida.service";
import {CategoriaService} from "../../../service/categoria/categoria.service";
import {SubCategoriaService} from "../../../service/subcategoria/sub-categoria.service";
import {MarcaService} from "../../../service/marca/marca.service";
import {ItensTipoMedida} from "../../../model/ItensTipoMedida";
import {DominioService} from "../../../service/dominio/dominio.service";
import {Dominio} from "../../../model/dominio";

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

    fornecedores: Fornecedor[];
    categorias: Categoria[];
    subcategorias: Subcategoria[];
    marcas: Marca[];
    medidas: Medida[];
    itensTipoMedida: ItensTipoMedida[] = [];
    dominios: Dominio[];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private produtoService: ProdutoService,
        private alertaService: AlertaService,
        private dialogComponente: MatDialog,
        private fornecedorService: FornecedorService,
        private medidaService: MedidaService,
        private categoriaService: CategoriaService,
        private subcategoriaService: SubCategoriaService,
        private marcaService: MarcaService,
        private dominioService: DominioService
    ) {
        this.produtoForm = this.formBuilder.group({
            barCode: ['', Validators.required],
            nome: ['', Validators.required],
            descricao: ['', Validators.required],
            precoCusto: ['', Validators.required],
            porcentagem: ['', Validators.required],
            precoVenda: ['', Validators.required],
            porcentagemDesconto: ['', Validators.required],
            desconto: ['', Validators.required],
            precoOferta: ['', Validators.required],
            peso: ['', Validators.required],
            fornecedor: ['', Validators.required],
            medida: ['', Validators.required],
            categoria: ['', Validators.required],
            subcategoria: ['', Validators.required],
            marca: ['', Validators.required]
        });
    }

    ngOnInit() {
        const codigo = this.activatedRoute.snapshot.params['codigo'];

        this.fornecedorService.consultar().subscribe(
            (fornecedor: any[]) => {
                this.fornecedores = fornecedor;
            }, (error) => console.log(error)
        );

        this.medidaService.consultar().subscribe(
            (medida: any[]) => {
                this.medidas = medida;
            }, (error) => console.log(error)
        );

        this.categoriaService.consultar().subscribe(
            (categoria: any[]) => {
                this.categorias = categoria;
            }, (error) => console.log(error)
        );

        this.subcategoriaService.consultar().subscribe(
            (subcategoria: any[]) => {
                this.subcategorias = subcategoria;
            }, (error) => console.log(error)
        );

        this.marcaService.consultar().subscribe(
            (marca: any[]) => {
                this.marcas = marca;
            }, (error) => console.log(error)
        );

        this.dominioService.consultar().subscribe(
            (dominio: any[]) => {
                this.dominios = dominio;
            }, (error) => console.log(error)
        );

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

    stringify(o: any): string {
        return JSON.stringify(o);
    }

    onChangeCategoria(value) {
        var categoria: Categoria = JSON.parse(value);
        this.subcategoriaService.getSubcategoriaByCategoriaId(categoria.codigo).subscribe(
            (subcategoria: any[]) => {
                this.subcategorias = subcategoria;
            }, (error) => console.log(error)
        );
        this.produtoForm.get('subcategoria').setValue(this.subcategorias[0]);
    }

    onChangeMedida(value) {
        var medida: Medida = JSON.parse(value);
        this.itensTipoMedida = medida.itensTipoMedida;
    }
}
