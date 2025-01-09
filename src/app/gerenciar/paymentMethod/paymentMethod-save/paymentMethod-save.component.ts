import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {AlertService} from "../../../service/mensagens/alerta/alert.service";
import {MatDialog} from "@angular/material/dialog";

import {first} from "rxjs/operators";
import {DialogComponent} from "../../../mensagens/dialog/dialog.component";
import {PaymentMethodService} from "../../../service/paymentMethod/payment-method.service";
import {PaymentMethod} from "../../../model/paymentMethod";

@Component({
    selector: 'app-paymentMethod-save',
    templateUrl: './paymentMethod-save.component.html',
})
export class PaymentMethodSaveComponent implements OnInit {

    nome_page: string = 'Payment Method';
    listar_page: string = 'paymentMethod/list';

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


    paymentMethodForm: FormGroup;
    submitted = false;
    update = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private paymentMethodService: PaymentMethodService,
        private alertService: AlertService,
        private dialogComponente: MatDialog
    ) {
        this.paymentMethodForm = this.formBuilder.group({
            id: [''],
            name: ['', [Validators.required, Validators.maxLength(45)]],
            description: ['', [Validators.required, Validators.maxLength(45)]],
            discountPercent: ['0', [Validators.required, Validators.max(100), Validators.min(0)]],
        });
    }

    ngOnInit() {
        const id = this.activatedRoute.snapshot.params['id'];

        if (id !== undefined) {
            this.update = true;
            this.paymentMethodService.findById(id).subscribe(
                (m: PaymentMethod) => {
                    this.paymentMethodForm.setValue({
                        id: m.id,
                        name: m.name,
                        description: m.description,
                        discountPercent: m.discountPercent
                    });
                });
        }
    }

    get f() {
        return this.paymentMethodForm.controls;
    }

    onSave() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.paymentMethodForm.invalid) {
            return;
        }

        this.paymentMethodService.save(this.paymentMethodForm.value)
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

        const dialogRef = this.dialogComponente.open(DialogComponent, {
            data: {
                cabecalho: this.cabecalho_alterar,
                id: this.paymentMethodForm.value.id,
                name: this.paymentMethodForm.value.name,
                mensagem: this.mensagem_alterar,
                tipo: this.tipo_alterar
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.submitted = true;
                // stop here if form is invalid
                if (this.paymentMethodForm.invalid) {
                    return;
                }

                this.paymentMethodService.update(this.paymentMethodForm.value)
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
        this.paymentMethodForm.reset();
        this.submitted = false;
        this.update = false;

    }

    onDelete(element: PaymentMethod) {
        const dialogRef = this.dialogComponente.open(DialogComponent, {
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
                this.paymentMethodService.delete(element.id)
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
