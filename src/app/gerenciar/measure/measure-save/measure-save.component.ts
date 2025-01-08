import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../service/mensagens/alerta/alert.service";
import {MeasureService} from "../../../service/measure/measure.service";
import {Measure} from "../../../model/measure";
import {Category} from "../../../model/category";
import {Subcategory} from "../../../model/subcategory";
import {Brand} from "../../../model/brand";
import {BrandService} from "../../../service/brand/brand.service";
import {CategoryService} from "../../../service/category/category.service";
import {SubcategoryService} from "../../../service/subcategory/subcategory.service";
import {first} from "rxjs/operators";
import {ItemsTypeMeasure} from "../../../model/ItemsTypeMeasure";
import {DialogComponent} from "../../../mensagens/dialog/dialog.component";
import {MatDialog} from "@angular/material";

@Component({
    selector: 'app-measure-save',
    templateUrl: './measure-save.component.html'
})
export class MeasureSaveComponent implements OnInit {

    category: Category;
    subcategory: Subcategory;
    categories: Category[] = [];
    subcategories: Subcategory[] = [];
    brands: Brand[] = [];
    brand: Brand;
    measure: Measure = new Measure();
    itemsTypeMeasure: ItemsTypeMeasure[] = [];

    measureForm: FormGroup;
    submitted = false;
    update = false;
    disable = true;


    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private measureService: MeasureService,
        private alertService: AlertService,
        private marcaService: BrandService,
        private categoryService: CategoryService,
        private subcategoryService: SubcategoryService,
        private dialogComponent: MatDialog
    ) {
        this.measureForm = new FormGroup({
            id: new FormControl(''),
            name: new FormControl('', [Validators.required,Validators.maxLength(45)]),
            description: new FormControl('', [Validators.required,Validators.maxLength(45)]),
            category: new FormControl('', Validators.required),
            subcategory: new FormControl({value: '', disabled: true}, Validators.required),
            brand: new FormControl('', Validators.required),
            valor: new FormControl('', Validators.required),
        });


    }

    ngOnInit() {
        const id = this.activatedRoute.snapshot.params['id'];

        this.marcaService.findAll().subscribe(
            (brand: any[]) => {
                this.brands = brand;
            }, (error) => console.log(error)
        );

        this.categoryService.findAll().subscribe(
            (category: any[]) => {
                this.categories = category;
            }, (error) => console.log(error)
        );

        if (id !== undefined) {
            this.update = true;
            this.disable = false;
            this.measureService.findById(id).subscribe(
                (measure: Measure) => {
                    this.measureForm.setValue({
                        id: measure.id,
                        name: measure.name,
                        description: measure.description,
                        category: this.stringify(measure.itemsTypeMeasure[0].category),
                        subcategory: this.stringify(measure.itemsTypeMeasure[0].subcategory),
                        brand: this.stringify(measure.itemsTypeMeasure[0].brand),
                        valor: ''
                    });
                    this.itemsTypeMeasure = measure.itemsTypeMeasure;
                    this.subcategories = measure.itemsTypeMeasure[0].category.subcategories;
                });
        }
    }

    onChange(value) {
        this.category = JSON.parse(value);
        this.subcategoryService.findSubCategoryByCategory(this.category.id).subscribe(
            (subcategory: any[]) => {
                this.subcategories = subcategory;
            }, (error) => console.log(error)
        );
        this.disable = false;
        this.measureForm.get('subcategory').setValue(this.subcategories[0]);
    }

    stringify(o: any): string {
        return JSON.stringify(o);
    }

    onAdd() {
        this.itemsTypeMeasure.push(new ItemsTypeMeasure(this.measureForm.get('amount').value));
        this.measureForm.get('amount').setValue('');

    }

    onRemove(index) {
        this.itemsTypeMeasure.splice(index, 1);
    }

    onSave() {

        this.submitted = true;

        // stop here if form is invalid
        if (this.measureForm.invalid) {
            return;
        }
        this.measure = this.measureForm.value;
        this.measure.category = JSON.parse(this.measureForm.get('category').value);
        this.measure.subcategory = JSON.parse(this.measureForm.get('subcategory').value);
        this.measure.brand = JSON.parse(this.measureForm.get('brand').value);
        this.measure.itemsTypeMeasure = this.itemsTypeMeasure;
        this.measureService.save(this.measure)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registered successfully!', true);
                    this.router.navigate(['measure/list']);
                },
                error => {
                    this.alertService.error(error);
                });
    }

    get f() {
        return this.measureForm.controls;
    }


    onCancel() {
        this.measureForm = new FormGroup({
            id: new FormControl(''),
            name: new FormControl('', [Validators.required,Validators.maxLength(45)]),
            description: new FormControl('', [Validators.required,Validators.maxLength(45)]),
            category: new FormControl('', Validators.required),
            subcategory: new FormControl({value: '', disabled: true}, Validators.required),
            brand: new FormControl('', Validators.required),
            valor: new FormControl('', Validators.required),
        });

        this.itemsTypeMeasure = [];
        this.submitted = false;
        this.update = false;
        this.disable = true;

        this.categories = [];
        this.subcategories = [];
        this.brands = [];


        this.marcaService.findAll().subscribe(
            (brand: any[]) => {
                this.brands = brand;
            }, (error) => console.log(error)
        );

        this.categoryService.findAll().subscribe(
            (category: any[]) => {
                this.categories = category;
            }, (error) => console.log(error)
        );
    }

    onDelete(element: Measure) {
        const dialogRef = this.dialogComponent.open(DialogComponent, {
            data: {
                cabecalho: "Delete?",
                id: element.id,
                name: element.name,
                mensagem: "Do you really want to delete?",
                tipo: "danger"
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.measureService.delete(element.id)
                    .pipe(first())
                    .subscribe(
                        () => {
                            this.alertService.success('Measure was successfully deactivated!', true);
                            this.router.navigate(['measure/list']);
                        },
                        error => {
                            this.alertService.error("Error deactivating Measure" + error);
                        });
            }
        });
    }

    onUpdate() {
        const dialogRef = this.dialogComponent.open(DialogComponent, {
            data: {
                cabecalho: "Edit?",
                id: this.measureForm.value.id,
                name: this.measureForm.value.name,
                mensagem: "Do you really want to edit?",
                tipo: "warning"
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {

                this.submitted = true;
                // stop here if form is invalid
                if (this.measureForm.invalid) {
                    return;
                }

                this.measure = new Measure();
                this.measure = this.measureForm.value;
                this.measure.category = JSON.parse(this.measureForm.get('category').value);
                this.measure.subcategory = JSON.parse(this.measureForm.get('subcategory').value);
                this.measure.brand = JSON.parse(this.measureForm.get('brand').value);
                this.measure.itemsTypeMeasure = this.itemsTypeMeasure;
                this.measureService.update(this.measure)
                    .pipe(first())
                    .subscribe(
                        data => {
                            this.alertService.success('Updated successfully!', true);
                            this.router.navigate(['measure/list']);
                        },
                        error => {
                            this.alertService.error(error);
                        });
            }
        });
    }

}
