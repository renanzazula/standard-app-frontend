import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../service/mensagens/alerta/alert.service';
import {MatDialog} from '@angular/material';
import {first} from 'rxjs/operators';
import {DialogComponent} from '../../../mensagens/dialog/dialog.component';
import {SubcategoryService} from '../../../service/subcategory/subcategory.service';
import {Subcategory} from '../../../model/subcategory';

@Component({
    selector: 'app-subcategory-save',
    templateUrl: './subcategory-save.component.html'
})
export class SubcategorySaveComponent implements OnInit {

    nome_page: string = 'Subcategory';
    listar_page: string = 'subcategory/list';

    mensagem_excluir = "Do you really want to delete?";
    cabecalho_excluir = "Delete?";
    tipo_excluir = "danger";
    message_desativado_sucesso = this.nome_page + ' was successfully deactivated!';

    cabecalho_alterar = "Edit?";
    mensagem_alterar = "Do you really want to edit?";
    tipo_alterar = "warning";
    message_alterado_sucesso = 'Updated successfully!';

    message_registrado_sucesso = 'Registered successfully!';
    messagem_erro = "Error deactivating "+ this.nome_page + " ";


    subcategoriaForm: FormGroup;
    submitted = false;
    update = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private subcategoryService: SubcategoryService,
        private alertService: AlertService,
        private dialogComponent: MatDialog
    ) {
        this.subcategoriaForm = this.formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            description: ['', Validators.required],
        });
    }

    ngOnInit() {
        const id = this.activatedRoute.snapshot.params['id'];

        if (id !== undefined) {
            this.update = true;
            this.subcategoryService.findById(id).subscribe(
                (m: Subcategory) => {
                    this.subcategoriaForm.setValue({
                        id: m.id,
                        name: m.name,
                        description: m.description
                    });
                });
        }
    }

    get f() {
        return this.subcategoriaForm.controls;
    }

    onSave() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.subcategoriaForm.invalid) {
            return;
        }

        this.subcategoryService.save(this.subcategoriaForm.value)
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
                id: this.subcategoriaForm.value.id,
                name: this.subcategoriaForm.value.name,
                mensagem: this.mensagem_alterar,
                tipo: this.tipo_alterar
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.submitted = true;
                // stop here if form is invalid
                if (this.subcategoriaForm.invalid) {
                    return;
                }

                this.subcategoryService.update(this.subcategoriaForm.value)
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
        this.subcategoriaForm.reset();
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
                this.subcategoryService.delete(element.id)
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

}
