import {Component, OnInit} from '@angular/core';
import {Brand} from "../../../model/brand";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BrandService} from "../../../service/brand/brand.service";
import {first} from "rxjs/operators";
import {AlertService} from "../../../service/mensagens/alerta/alert.service";

import {ActivatedRoute, Router} from "@angular/router";
import {DialogComponent} from "../../../mensagens/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
    selector: 'app-brand-save',
    templateUrl: './brand-save.component.html'
})
export class BrandSaveComponent implements OnInit {


    brandForm: FormGroup;
    submitted = false;
    update = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private marcaService: BrandService,
        private alertService: AlertService,
        private dialogComponent: MatDialog
    ) {
        this.brandForm = this.formBuilder.group({
            id: [''],
            name: ['', [Validators.required,Validators.maxLength(45)]],
            description: ['', [Validators.required,Validators.maxLength(45)]],
        });
    }

    ngOnInit() {
        const id = this.activatedRoute.snapshot.params['id'];

        if (id !== undefined) {
            this.update = true;
            this.marcaService.findById(id).subscribe(
                (m: Brand) => {
                    this.brandForm.setValue({
                        id: m.id,
                        name: m.name,
                        description: m.description
                    });
                });
        }
    }

    get f() {
        return this.brandForm.controls;
    }

    onSave() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.brandForm.invalid) {
            return;
        }

        this.marcaService.save(this.brandForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registered successfully!', true);
                    this.router.navigate(['brand/list']);
                },
                error => {
                    this.alertService.error(error);
                });
    }

    onUpdate() {
        const dialogRef = this.dialogComponent.open(DialogComponent, {
            data: {
                cabecalho: "Edit?",
                id: this.brandForm.value.id,
                name: this.brandForm.value.name,
                mensagem: "Do you really want to edit?",
                tipo: "warning"
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {

                this.submitted = true;
                // stop here if form is invalid
                if (this.brandForm.invalid) {
                    return;
                }

                this.marcaService.update(this.brandForm.value)
                    .pipe(first())
                    .subscribe(
                        data => {
                            this.alertService.success('Updated successfully!', true);
                            this.router.navigate(['brand/list']);
                        },
                        error => {
                            this.alertService.error(error);
                        });
            }
        });
    }


    onCancel() {
        this.brandForm.reset();
        this.submitted = false;
        this.update = false;
    }

    onDelete(element: Brand) {
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
                this.marcaService.delete(element.id)
                    .pipe(first())
                    .subscribe(
                        () => {
                            this.alertService.success('Brand was successfully deactivated!', true);
                            this.router.navigate(['brand/list']);
                        },
                        error => {
                            this.alertService.error("Error deactivating Brand" + error);
                        });
            }
        });
    }
}
