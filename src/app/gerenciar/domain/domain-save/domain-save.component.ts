import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../service/mensagens/alerta/alert.service";
import {MatDialog} from "@angular/material";
import {first} from "rxjs/operators";
import {DialogComponent} from "../../../mensagens/dialog/dialog.component";
import {DomainService} from "../../../service/domain/domain.service";
import {Domain} from "../../../model/domain";

@Component({
    selector: 'app-domain-save',
    templateUrl: './domain-save.component.html',
})
export class DomainSaveComponent implements OnInit {


    nome_page: string = 'Domain';
    listar_page: string = 'domain/list';

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


    domainForm: FormGroup;
    submitted = false;
    update = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private domainService: DomainService,
        private alertService: AlertService,
        private dialogComponent: MatDialog
    ) {
        this.domainForm = this.formBuilder.group({
            id: [''],
            name: ['', [Validators.required, Validators.maxLength(45)]],
            description: ['', [Validators.required, Validators.maxLength(45)]]
        });
    }

    ngOnInit() {
        const id = this.activatedRoute.snapshot.params['id'];

        if (id !== undefined) {
            this.update = true;
            this.domainService.findById(id).subscribe(
                (m: Domain) => {
                    this.domainForm.setValue({
                        id: m.id,
                        name: m.name,
                        description: m.description
                    });
                });
        }
    }

    get f() {
        return this.domainForm.controls;
    }

    onSave() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.domainForm.invalid) {
            return;
        }

        this.domainService.save(this.domainForm.value)
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
                id: this.domainForm.value.id,
                name: this.domainForm.value.name,
                mensagem: this.mensagem_alterar,
                tipo: this.tipo_alterar
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.submitted = true;
                // stop here if form is invalid
                if (this.domainForm.invalid) {
                    return;
                }

                this.domainService.update(this.domainForm.value)
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
        this.domainForm.reset();
        this.submitted = false;
        this.update = false;

    }

    onDelete(element: Domain) {
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
                this.domainService.delete(element.id)
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
