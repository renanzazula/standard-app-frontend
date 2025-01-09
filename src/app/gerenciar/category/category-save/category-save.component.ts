import {Component, OnInit} from '@angular/core';
import {Category} from '../../../model/category';
import {Subcategory} from '../../../model/subcategory';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../service/mensagens/alerta/alert.service';
import {CategoryService} from '../../../service/category/category.service';
import {SubcategoryService} from '../../../service/subcategory/subcategory.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../../mensagens/dialog/dialog.component';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-category-save',
    templateUrl: './category-save.component.html'
})
export class CategorySaveComponent implements OnInit {

    categoryForm: FormGroup;
    subcategories: Subcategory[] = [];
    checkboxArray: FormArray = new FormArray([]);

    submitted = false;
    update = false;
    disable = true;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private alertaService: AlertService,
        private categoryService: CategoryService,
        private subcategoryService: SubcategoryService,
        private dialogComponent: MatDialog
    ) {
        this.mergeCheckbox([]);
        this.categoryForm = this.formBuilder.group({
            id: [''],
            name: ['', [Validators.required,Validators.maxLength(45)]],
            description: ['', [Validators.required, Validators.maxLength(45)]],
            subcategories: this.checkboxArray
        });
    }

    ngOnInit() {
        const id = this.activatedRoute.snapshot.params['id'];
        if (id !== undefined) {
            this.update = true;
            this.disable = false;
            this.categoryService.findById(id).subscribe(
                (category: Category) => {
                    this.mergeCheckbox(category.subcategories);
                    this.categoryForm.patchValue({
                        id: category.id,
                        name: category.name,
                        description: category.description,
                    });
                });
            this.categoryForm.setControl('subcategories', this.checkboxArray);
        }
    }

    mergeCheckbox(subcategorySelected: Subcategory[]) {
        this.subcategoryService.findAll().subscribe(
            (entry: any[]) => {
                entry.forEach((value, index) => {
                    var state = false;
                    subcategorySelected.forEach((v, i) => {
                        if (value.id === v.id) {
                            state = true;
                        }
                    });
                    this.subcategories[index] = value;
                    this.checkboxArray.insert(index, new FormControl(state))
                });
            }, (error) => console.log("ERROR" + error)
        );
    }

    onSave() {

        const selected = this.categoryForm.value.subcategories
            .map((v, i) => v ? this.subcategories[i] : null)
            .filter(v => v !== null);

        this.submitted = true;
        // stop here if form is invalid
        if (this.categoryForm.invalid) {
            return;
        }

        let category = this.categoryForm.value;
        category.subcategories = selected;

        this.categoryService.save(category)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertaService.success('Registered successfully!', true);
                    this.router.navigate(['category/list']);
                },
                error => {
                    this.alertaService.error(error);
                });
    }

    get f() {
        return this.categoryForm.controls;
    }

    onUpdate() {
        const dialogRef = this.dialogComponent.open(DialogComponent, {
            data: {
                cabecalho: "Edit?",
                id: this.categoryForm.value.id,
                name: this.categoryForm.value.name,
                mensagem: "Do you really want to edit?",
                tipo: "warning"
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {

                const selected = this.categoryForm.value.subcategories
                    .map((v, i) => v ? this.subcategories[i] : null)
                    .filter(v => v !== null);

                let category = this.categoryForm.value;
                category.subcategories = selected;

                this.submitted = true;
                // stop here if form is invalid
                if (this.categoryForm.invalid) {
                    return;
                }

                this.categoryService.update(category)
                    .pipe(first())
                    .subscribe(
                        data => {
                            this.alertaService.success('Updated successfully!', true);
                            this.router.navigate(['category/list']);
                        },
                        error => {
                            this.alertaService.error(error);
                        });
            }
        });
    }

    onCancel() {
        this.categoryForm.reset();
        this.submitted = false;
        this.update = false;
    }

    onDelete(element: Category) {
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
                this.categoryService.delete(element.id)
                    .pipe(first())
                    .subscribe(
                        () => {
                            this.alertaService.success('Category was successfully deactivated!', true);
                            this.router.navigate(['category/list']);
                        },
                        error => {
                            this.alertaService.error("Error deactivating categoría" + error);
                        });
            }
        });
    }
}
