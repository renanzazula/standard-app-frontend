import {Component, Input, OnInit} from '@angular/core';
import {Marca} from "../../../model/marca";
import {MarcaService} from "../../../service/marca/marca.service";
import {DialogComponent} from "../../../mensagens/dialog/dialog.component";
import {MatDialog} from "@angular/material";
import {first} from "rxjs/operators";
import {AlertaService} from "../../../service/mensagens/alerta/alerta.service";
import {GerenciarMarcaService} from "../gerenciar-marca.service";


@Component({
    selector: 'app-marca-lista',
    templateUrl: './marca-lista.component.html'
})
export class MarcaListaComponent implements OnInit {

    marcas: Marca[] = [];

    constructor(
        private marcaService: MarcaService,
        private alertaService:AlertaService,
        private gerenciarMarcaService: GerenciarMarcaService,
        private dialogComponente: MatDialog) {
    }

    ngOnInit() {
        this.gerenciarMarcaService.marcaChange.subscribe(
            () => {
                this.get();
            }
        );
        this.get();
    }

    get(){
        this.marcaService.consultar().subscribe(
            (marca: any[]) => {
                this.marcas = marca;
            }, (error) => console.log(error)
        );
    }

    onAlterar(element: Marca) {
        const dialogRef = this.dialogComponente.open(DialogComponent, {
            data: {
                cabecalho: "Editar?",
                codigo: element.codigo,
                nome: element.nome,
                mensagem: "Deseja realmente efeteuar a edição?",
                tipo: "warning"
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.gerenciarMarcaService.marcaOutputEventEmitter.emit(element);
            }
        });
    }

    onExcluir(element: Marca) {
        const dialogRef = this.dialogComponente.open(DialogComponent, {
            data: {
                cabecalho: "Excluir?",
                codigo: element.codigo,
                nome: element.nome,
                mensagem: "Deseja realmente efeteuar a exclusão?",
                tipo: "danger"
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.marcaService.excluir(element.codigo)
                    .pipe(first())
                    .subscribe(
                        () => {
                            this.alertaService.success('Marca foi desativada com sucesso!', true);
                            this.gerenciarMarcaService.marcaChange.emit();
                        },
                        error => {
                            console.log(error);
                            this.alertaService.error("Erro ao desativar Marca" + error);
                        });
            }
        });
    }
}
