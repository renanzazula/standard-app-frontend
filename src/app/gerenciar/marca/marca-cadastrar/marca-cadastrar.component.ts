import {Component, OnInit} from '@angular/core';
import {Marca} from "../../../model/marca";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MarcaService} from "../../../service/marca/marca.service";
import {first} from "rxjs/operators";
import {AlertaService} from "../../../service/mensagens/alerta/alerta.service";

import {ActivatedRoute, Router} from "@angular/router";


@Component({
    selector: 'app-marca-cadastrar',
    templateUrl: './marca-cadastrar.component.html'
})
export class MarcaCadastrarComponent implements OnInit {


    marcaForm: FormGroup;
    submitted = false;
    update = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private marcaService: MarcaService,
        private alertaService: AlertaService,
    ) {
        this.marcaForm = this.formBuilder.group({
            codigo: [''],
            nome: ['', Validators.required],
            descricao: ['', Validators.required],
        });
    }

    ngOnInit() {
        const codigo = this.activatedRoute.snapshot.params['codigo'];

        if (codigo !== undefined) {
            this.update = true;
            this.marcaService.getById(codigo).subscribe(
                (m: Marca) => {
                    this.marcaForm.setValue({
                        codigo: m.codigo,
                        nome: m.nome,
                        descricao: m.descricao
                    });
                });
        }
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
                    this.router.navigate(['marca/listar']);
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
                    this.router.navigate(['marca/listar']);
                },
                error => {
                    this.alertaService.error(error);
                });
    }

    onCancelar() {
        this.marcaForm.reset();
    }
}
