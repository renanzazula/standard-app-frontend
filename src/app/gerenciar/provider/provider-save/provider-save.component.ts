import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {AlertService} from "../../../service/mensagens/alerta/alert.service";
import {MatDialog} from "@angular/material/dialog";

import {first} from "rxjs/operators";
import {DialogComponent} from "../../../mensagens/dialog/dialog.component";
import {ProviderService} from "../../../service/provider/provider.service";
import {Provider} from "../../../model/provider";

@Component({
  selector: 'app-provider-save',
  templateUrl: './provider-save.component.html',
})
export class ProviderSaveComponent implements OnInit {

  nome_page: string = 'Provider';
  listar_page: string = 'provider/list';

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


  providerForm: FormGroup;
  submitted = false;
  update = false;

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private formBuilder: FormBuilder,
      private providerService: ProviderService,
      private alertService: AlertService,
      private dialogComponent: MatDialog
  ) {
    this.providerForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required, Validators.maxLength(45)],
      description: ['', Validators.required, Validators.maxLength(45)]
    });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id !== undefined) {
      this.update = true;
      this.providerService.findById(id).subscribe(
          (m: Provider) => {
            this.providerForm.setValue({
              id: m.id,
              name: m.name,
              description: m.description

            });
          });
    }
  }

  get f() {
    return this.providerForm.controls;
  }

  onSave() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.providerForm.invalid) {
      return;
    }

    this.providerService.save(this.providerForm.value)
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
        id: this.providerForm.value.id,
        name: this.providerForm.value.name,
        mensagem: this.mensagem_alterar,
        tipo: this.tipo_alterar
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.submitted = true;
        // stop here if form is invalid
        if (this.providerForm.invalid) {
          return;
        }

        this.providerService.update(this.providerForm.value)
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
    this.providerForm.reset();
    this.submitted = false;
    this.update = false;

  }

  onDelete(element: Provider) {
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
        this.providerService.delete(element.id)
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
