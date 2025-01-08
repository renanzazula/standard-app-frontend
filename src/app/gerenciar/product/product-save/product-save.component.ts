import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../service/mensagens/alerta/alert.service";
import {MatDialog} from "@angular/material";
import {Subcategory} from "../../../model/subcategory";
import {first} from "rxjs/operators";
import {DialogComponent} from "../../../mensagens/dialog/dialog.component";
import {ProductService} from "../../../service/product/product.service";
import {Provider} from "../../../model/provider";
import {Measure} from "../../../model/measure";
import {Category} from "../../../model/category";
import {Brand} from "../../../model/brand";
import {ProviderService} from "../../../service/provider/provider.service";
import {MeasureService} from "../../../service/measure/measure.service";
import {CategoryService} from "../../../service/category/category.service";
import {SubcategoryService} from "../../../service/subcategory/subcategory.service";
import {BrandService} from "../../../service/brand/brand.service";
import {ItemsTypeMeasure} from "../../../model/ItemsTypeMeasure";
import {DomainService} from "../../../service/domain/domain.service";
import {Domain} from "../../../model/domain";
import {Product} from "../../../model/product";
import {ProductHasItemsTypeMeasure} from "../../../model/productHasItemsTypeMeasure";

@Component({
    selector: 'app-product-save',
    templateUrl: './product-save.component.html'
})
export class ProductSaveComponent implements OnInit {

    selectedFiles: FileList;
    currentFileUpload: File;
    progress: { percentage: number } = { percentage: 0 };

    nome_page: string = 'Product';
    listar_page: string = 'product/list';

    mensagem_excluir = "Do you really want to delete?";
    cabecalho_excluir = "Delete?";
    tipo_excluir = "danger";
    message_desativado_sucesso = this.nome_page + ' was successfully deactivated!';

    cabecalho_alterar = "Edit?";
    mensagem_alterar = "Do you really want to edit?";
    tipo_alterar = "warning";
    message_alterado_sucesso = 'Updated successfully!';

    message_registrado_sucesso = 'Registered successfully!';
    messagem_erro = "Error deactivating " + this.nome_page + " ";

    productForm: FormGroup;
    submitted = false;
    update = false;

    temCategoria = false;
    temSubcategoria = false;
    temMarca = false;

    providers: Provider[];
    categories: Category[];
    subcategories: Subcategory[];
    brands: Brand[];
    measures: Measure[];
    itemsTypeMeasure: ItemsTypeMeasure[] = [];
    domains: Domain[];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private productService: ProductService,
        private alertService: AlertService,
        private dialogComponent: MatDialog,
        private providerService: ProviderService,
        private measureService: MeasureService,
        private categoryService: CategoryService,
        private subcategoryService: SubcategoryService,
        private brandService: BrandService,
        private domainService: DomainService,
    ) {
        this.productForm = this.formBuilder.group({
            image: [Image],
            barCode: ['', [Validators.required, Validators.maxLength(100)]],
            name: ['', [Validators.required, Validators.maxLength(100)]],
            description: ['', [Validators.required, Validators.maxLength(150)]],

            costPrice: ['', Validators.required],
            percent: ['', [Validators.required, Validators.maxLength(5)]],
            price: ['', Validators.required],
            discountPercent: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
            discount: ['', Validators.required],
            salePrice: ['', Validators.required],
            peso: ['', Validators.required],

            provider: ['', Validators.required],
            measure: ['', Validators.required],
            category: ['', Validators.required],
            subcategory: ['', Validators.required],
            brand: [''],
            pHITipoMedida: this.formBuilder.array([])
        });
    }

    ngOnInit() {
        const id = this.activatedRoute.snapshot.params['id'];

        this.providerService.findAll().subscribe(
            (provider: any[]) => {
                this.providers = provider;
            }, (error) => console.log(error)
        );

        this.measureService.findAll().subscribe(
            (measure: any[]) => {
                this.measures = measure;
            }, (error) => console.log(error)
        );

        this.categoryService.findAll().subscribe(
            (category: any[]) => {
                this.categories = category;
            }, (error) => console.log(error)
        );

        this.subcategoryService.findAll().subscribe(
            (subcategory: any[]) => {
                this.subcategories = subcategory;
            }, (error) => console.log(error)
        );

        this.brandService.findAll().subscribe(
            (brand: any[]) => {
                this.brands = brand;
            }, (error) => console.log(error)
        );

        this.domainService.findAll().subscribe(
            (domain: any[]) => {
                this.domains = domain;
            }, (error) => console.log(error)
        );


    }

    get f() {
        return this.productForm.controls;
    }

    onSave() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.productForm.invalid) {
            return;
        }

        var product: Product = new Product();
        product.barCode = this.productForm.controls.barCode.value;
        product.name = this.productForm.controls.name.value;
        product.description = this.productForm.controls.description.value;
        product.costPrice = this.productForm.controls.costPrice.value;
        product.percent = this.productForm.controls.percent.value;
        product.price = this.productForm.controls.price.value;
        product.discountPercent = this.productForm.controls.discountPercent.value;
        product.discount = this.productForm.controls.discount.value;
        product.salePrice = this.productForm.controls.salePrice.value;
        product.peso = this.productForm.controls.peso.value;
        product.provider = JSON.parse(this.productForm.controls.provider.value);
        product.measure = JSON.parse(this.productForm.controls.measure.value);
        product.category = JSON.parse(this.productForm.controls.category.value);
        product.subcategory = JSON.parse(this.productForm.controls.subcategory.value);
        product.brand = JSON.parse(this.productForm.controls.brand.value);

        const pFormArray = this.productForm.controls.pHITipoMedida as FormArray;
        const productHasItemsTypeMeasureAux: ProductHasItemsTypeMeasure[] = [];

        pFormArray.controls.forEach((item, index) => {
            var pHasItensTipoMedida = new ProductHasItemsTypeMeasure();
            pHasItensTipoMedida.id = item.value.id;
            pHasItensTipoMedida.quantity = item.value.quantity;
            pHasItensTipoMedida.unitValue = product.price;
            pHasItensTipoMedida.itemsTypeMeasure = product.measure.itemsTypeMeasure[index];

            const selectedDomains = item.value.dominiosFormArray.map(
                (v, i) => v ? this.domains[i] : null).filter(v => v !== null);

            pHasItensTipoMedida.domains = this.mergeDomains(selectedDomains);
            productHasItemsTypeMeasureAux.push(pHasItensTipoMedida);
        });

        product.productHasItemsTypeMeasure = productHasItemsTypeMeasureAux;


        this.productService.save(product)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success(this.message_registrado_sucesso, true);
                    this.router.navigate([this.listar_page]);
                },
                error => {
                    this.alertService.error(error);
                });
    }

    onUpdate() {

        const dialogRef = this.dialogComponent.open(DialogComponent, {
            data: {
                cabecalho: this.cabecalho_alterar,
                id: this.productForm.value.id,
                name: this.productForm.value.name,
                mensagem: this.mensagem_alterar,
                tipo: this.tipo_alterar
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.submitted = true;
                // stop here if form is invalid
                if (this.productForm.invalid) {
                    return;
                }

                this.productService.update(this.productForm.value)
                    .pipe(first())
                    .subscribe(
                        data => {
                            this.alertService.success(this.message_alterado_sucesso, true);
                            this.router.navigate([this.listar_page]);
                        },
                        error => {
                            this.alertService.error(error);
                        });
            }
        });
    }

    onCancel() {
        this.productForm.reset();
        this.submitted = false;
        this.update = false;
    }

    onDelete(element: Subcategory) {
        const dialogRef = this.dialogComponent.open(DialogComponent, {
            data: {
                cabecalho: this.cabecalho_excluir,
                id: element.id,
                name: element.name,
                mensagem: this.mensagem_excluir,
                tipo: this.tipo_excluir
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.productService.delete(element.id)
                    .pipe(first())
                    .subscribe(
                        () => {
                            this.alertService.success(this.message_desativado_sucesso, true);
                            this.router.navigate([this.listar_page]);
                        },
                        error => {
                            this.alertService.error(this.messagem_erro + error);
                        });
            }
        });
    }

    stringify(o: any): string {
        return JSON.stringify(o);
    }

    onChangeCategory(value) {
        var category: Category = JSON.parse(value);
        this.subcategoryService.findSubCategoryByCategory(category.id).subscribe(
            (subcategory: any[]) => {
                this.subcategories = subcategory;
            }, (error) => console.log(error)
        );
        this.productForm.get('subcategory').setValue(this.subcategories[0]);
    }

    onChangeMeasure(value) {
        var domainsFormArray = new FormArray([]);
        var pHITipoMedida = new FormArray([]);

        const measure: Measure = JSON.parse(value);
        this.itemsTypeMeasure = measure.itemsTypeMeasure;

        if (this.itemsTypeMeasure != undefined) {
            if (this.itemsTypeMeasure.length != 0) {
                if (this.itemsTypeMeasure[0].category != undefined) {
                    this.temCategoria = true;
                    this.productForm.get('category').setValue(this.stringify(this.itemsTypeMeasure[0].category));
                } else {
                    this.temCategoria = false;
                }
                if (this.itemsTypeMeasure[0].subcategory != undefined) {
                    this.temSubcategoria = true;
                    this.productForm.get('subcategory').setValue(this.stringify(this.itemsTypeMeasure[0].subcategory));
                } else {
                    this.temSubcategoria = false;
                }
                if (this.itemsTypeMeasure[0].brand != undefined) {
                    this.temMarca = true;
                    this.productForm.get('brand').setValue(this.stringify(this.itemsTypeMeasure[0].brand));
                } else {
                    this.temMarca = false;
                }
            } else {
                this.temCategoria = false;
                this.temSubcategoria = false;
                this.temMarca = false;
            }
        }

        this.domains.forEach((domain, i) => {
            domainsFormArray.insert(i, new FormControl(false));
        });

        this.itemsTypeMeasure.forEach((itemTipoMedida, i) => {
            pHITipoMedida.insert(i,
                this.formBuilder.group({
                    id: itemTipoMedida.id,
                    quantity: ['', Validators.required],
                    dominiosFormArray: domainsFormArray
                }));
        });
        console.log(pHITipoMedida);
        this.productForm.setControl('pHITipoMedida', pHITipoMedida);
    }

    private mergeDomains(selected: Domain[]): Domain[] {
        var domainChecked: Domain[] = [];
        this.domains.forEach((domain, i) => {
            selected.forEach((domainSelected, h) => {
                if (domainSelected.id === domain.id) {
                    domainChecked.push(domain);
                }
            });
        });
        console.log("domainChecked");
        console.log(domainChecked);
        return domainChecked;
    }

    selectFile(event) {

        this.selectedFiles = event.target.files;
        console.log(this.selectedFiles);
    }

    calculateOrderAmount() {
      console.log("calculateOrderAmount")
      var totalPrice = this.productService.calculateOrderAmount(this.productForm.controls.percent.value,  this.productForm.controls.costPrice.value)
      this.productForm.controls.price.setValue(totalPrice);
    }

    calculateDiscount(){
      console.log("calculateDiscount")
      var discountPercent = this.productForm.controls.discountPercent.value;
      var costPrice = this.productForm.controls.costPrice.value;
      var price = this.productForm.controls.price.value;
      this.productForm.controls.salePrice.setValue(this.productService.calculateDiscount(discountPercent, costPrice, price));
    }
}

