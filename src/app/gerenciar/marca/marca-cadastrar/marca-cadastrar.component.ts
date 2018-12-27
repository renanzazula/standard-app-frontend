import {Component, Input, OnInit} from '@angular/core';
import {Marca} from "../../../model/marca";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MarcaService} from "../../../service/marca/marca.service";
import {first} from "rxjs/operators";
import {AlertaService} from "../../../service/mensagens/alerta/alerta.service";
import {GerenciarMarcaService} from "../gerenciar-marca.service";

@Component({
    selector: 'app-marca-cadastrar',
    templateUrl: './marca-cadastrar.component.html'

})
export class MarcaCadastrarComponent implements OnInit {

    marcaForm: FormGroup;
    submitted = false;
    update = false;

    constructor(
        private formBuilder: FormBuilder,
        private marcaService: MarcaService,
        private alertaService: AlertaService,
        private gerenciarMarcaService: GerenciarMarcaService
    ) {
    }

    ngOnInit() {
        this.gerenciarMarcaService.marcaOutputEventEmitter.subscribe(
            (marca: Marca) => {
                this.marcaService.getById(marca.codigo).subscribe(
                    (m: Marca) => {
                        this.marcaForm = this.formBuilder.group({
                            codigo: [m.codigo.toString()],
                            nome: [m.nome.toString(), Validators.required],
                            descricao: [m.descricao.toString(), Validators.required],
                        });
                    }
                );
                this.update = true;
            }
        );
        this.marcaForm = this.formBuilder.group({
            codigo: [],
            nome: ['', Validators.required],
            descricao: ['', Validators.required],
        });
    }

    get f() {
        return this.marcaForm.controls;
    }

    onCadastrar() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.marcaForm.invalid) {
            return;
        }

        this.marcaService.cadastrar(this.marcaForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertaService.success('Registrado com sucesso!', true);
                    this.marcaForm.reset();
                    this.submitted = false;
                    this.gerenciarMarcaService.marcaChange.emit();
                },
                error => {
                    this.alertaService.error(error);
                });
    }

    onAlterar() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.marcaForm.invalid) {
            return;
        }

        this.marcaService.alterar(this.marcaForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertaService.success('Alterado com sucesso!', true);
                    this.marcaForm.reset();
                    this.submitted = false;
                    this.update = false;
                    this.gerenciarMarcaService.marcaChange.emit();
                },
                error => {
                     this.alertaService.error(error);
                });
    }

    onCancelar() {
        this.marcaForm.reset();
    }
}
