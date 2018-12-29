import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertaService} from "../../../service/mensagens/alerta/alerta.service";
import {MedidaService} from "../../../service/medida/medida.service";

@Component({
    selector: 'app-medida-cadastrar',
    templateUrl: './medida-cadastrar.component.html'
})
export class MedidaCadastrarComponent implements OnInit {

    marcaForm: FormGroup;
    submitted = false;
    update = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private medidaService: MedidaService,
        private alertaService: AlertaService,
    ) {
        this.marcaForm = this.formBuilder.group({
            codigo: [''],
            nome: ['', Validators.required],
            descricao: ['', Validators.required],
        });
    }

    ngOnInit() {
    }

}
