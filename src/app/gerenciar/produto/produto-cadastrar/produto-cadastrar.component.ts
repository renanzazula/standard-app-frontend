import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
import {Produto} from "../../../model/produto";
import {ProdutoHasItensTipoMedida} from "../../../model/produtoHasItensTipoMedida";
import {FileUploader} from "ng2-file-upload";

@Component({
    selector: 'app-produto-cadastrar',
    templateUrl: './produto-cadastrar.component.html'
})
export class ProdutoCadastrarComponent implements OnInit {

    public uploader: FileUploader = new FileUploader({url: '', itemAlias: 'photo'});

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

    temCategoria=false;
    temSubcategoria=false;
    temMarca=false;

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
            image: [Image],
            barCode: ['',   [Validators.required, Validators.maxLength(100)]],
            nome: ['',      [Validators.required, Validators.maxLength(100)]],
            descricao: ['', [Validators.required, Validators.maxLength(150)]],

            precoCusto:  ['', Validators.required],
            porcentagem: ['', [Validators.required, Validators.maxLength(5)]],
            precoVenda:  ['', Validators.required],
            porcentagemDesconto: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
            desconto: ['', Validators.required],
            precoOferta: ['', Validators.required],
            peso: ['', Validators.required],

            fornecedor: ['', Validators.required],
            medida: ['', Validators.required],
            categoria: ['', Validators.required],
            subcategoria: ['', Validators.required],
            marca: [''],
            pHITipoMedida: this.formBuilder.array([])
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

        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            console.log('ImageUpload:uploaded:', item, status, response);
            alert('File uploaded successfully');
        };

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

        var produto: Produto = new Produto();
        produto.barCode      = this.produtoForm.controls.barCode.value;
        produto.nome         = this.produtoForm.controls.nome.value;
        produto.descricao    = this.produtoForm.controls.descricao.value;
        produto.precoCusto   = this.produtoForm.controls.precoCusto.value;
        produto.porcentagem  = this.produtoForm.controls.porcentagem.value;
        produto.precoVenda   = this.produtoForm.controls.precoVenda.value;
        produto.porcentagemDesconto = this.produtoForm.controls.porcentagemDesconto.value;
        produto.desconto     = this.produtoForm.controls.desconto.value;
        produto.precoOferta  = this.produtoForm.controls.precoOferta.value;
        produto.peso         = this.produtoForm.controls.peso.value;
        produto.fornecedor   = JSON.parse(this.produtoForm.controls.fornecedor.value);
        produto.medida       = JSON.parse(this.produtoForm.controls.medida.value);
        produto.categoria    = JSON.parse(this.produtoForm.controls.categoria.value);
        produto.subcategoria = JSON.parse(this.produtoForm.controls.subcategoria.value);
        produto.marca        = JSON.parse(this.produtoForm.controls.marca.value);

        const pFormArray = this.produtoForm.controls.pHITipoMedida as FormArray;

        console.log("pFormArray");
        console.log(pFormArray);
        const produtoHasItensTipoMedidaAux: ProdutoHasItensTipoMedida[] = [];

        pFormArray.controls.forEach((item, index)=>{
            var pHasItensTipoMedida = new ProdutoHasItensTipoMedida();
            pHasItensTipoMedida.codigo= item.value.codigo;
            pHasItensTipoMedida.quantidade= item.value.quantidade;
            pHasItensTipoMedida.valorUnitario= produto.precoVenda;
            pHasItensTipoMedida.itensTipoMedida=produto.medida.itensTipoMedida[index];

            console.log(item.value.dominiosFormArray);

            const dominiosSelecionados = item.value.dominiosFormArray.map(
                (v, i) => v ? this.dominios[i] : null).filter(v => v !== null);

            console.log("dominios selecionados");
            console.log(dominiosSelecionados);
            pHasItensTipoMedida.dominios = this.mergeDominios(dominiosSelecionados);

            console.log("pHasItensTipoMedida");
            console.log(pHasItensTipoMedida);

            produtoHasItensTipoMedidaAux.push(pHasItensTipoMedida);
        });

        console.log("produtoHasItensTipoMedidaAux");
        console.log(produtoHasItensTipoMedidaAux);

        produto.produtoHasItensTipoMedida = produtoHasItensTipoMedidaAux;

        console.log(produto);

        this.produtoService.cadastrar(produto)
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
        var dominiosFormArray = new FormArray([]);
        var pHITipoMedida = new FormArray([]);

        const medida: Medida = JSON.parse(value);
        this.itensTipoMedida = medida.itensTipoMedida;

        if(this.itensTipoMedida != undefined){
            if(this.itensTipoMedida.length != 0){
                if(this.itensTipoMedida[0].categoria != undefined) {
                    this.temCategoria = true;
                    this.produtoForm.get('categoria').setValue(this.stringify(this.itensTipoMedida[0].categoria));
                }else{
                    this.temCategoria = false;
                }
                if(this.itensTipoMedida[0].subcategoria!= undefined) {
                    this.temSubcategoria = true;
                    this.produtoForm.get('subcategoria').setValue(this.stringify(this.itensTipoMedida[0].subcategoria));
                }else{
                    this.temSubcategoria = false;
                }
                if(this.itensTipoMedida[0].marca != undefined) {
                    this.temMarca = true;
                    this.produtoForm.get('marca').setValue(this.stringify(this.itensTipoMedida[0].marca));
                }else{
                    this.temMarca = false;
                }
            }else{
                this.temCategoria = false;
                this.temSubcategoria = false;
                this.temMarca = false;
            }
        }

        this.dominios.forEach((dominio, i)=>{
            dominiosFormArray.insert(i, new FormControl(false));
        });

        this.itensTipoMedida.forEach((itemTipoMedida, i) =>{
            pHITipoMedida.insert(i,
                this.formBuilder.group({
                    codigo: itemTipoMedida.codigo,
                    quantidade: ['', Validators.required],
                    dominiosFormArray: dominiosFormArray
                }));
        });
        console.log(pHITipoMedida);
        this.produtoForm.setControl('pHITipoMedida', pHITipoMedida);
    }

    private mergeDominios(selecionados: Dominio[]): Dominio[]{
      var dominioChecked: Dominio[] = [];
      this.dominios.forEach((dominio, i)=>{
          selecionados.forEach((selecionado, h)=>{
              if(selecionado.codigo === dominio.codigo){
                  dominioChecked.push(dominio);
              }
          });
      });
      console.log("dominioChecked");
      console.log(dominioChecked);
      return dominioChecked;
    }

}

