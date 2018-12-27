import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import {Marca} from "../../../model/marca";
import {MarcaService} from "../../../service/marca/marca.service";
import {DialogComponent} from "../../../mensagens/dialog/dialog.component";
import {MatDialog} from "@angular/material";
import {first} from "rxjs/operators";
import {AlertaService} from "../../../service/mensagens/alerta/alerta.service";


@Component({
    selector: 'app-marca-lista',
    templateUrl: './marca-lista.component.html'
})
export class MarcaListaComponent implements OnInit {

    @Output() marcaSelecionada = new EventEmitter<Marca>();

    marcas: Marca[] = [];

    constructor(
        private marcaService: MarcaService,
        private alertaService:AlertaService,
        private dialog: MatDialog) {
    }

    ngOnInit() {
        this.marcaService.consultar().subscribe(
            (marca: any[]) => {
                this.marcas = marca;
            }, (error) => console.log(error)
        );
    }

    onAlterar(element: Marca) {
        const dialogRef = this.dialog.open(DialogComponent, {
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
                this.marcaSelecionada.emit(element);
            }
        });
    }

    onExcluir(element: Marca) {
        const dialogRef = this.dialog.open(DialogComponent, {
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
                        data => {
                            console.log(data);
                            this.alertaService.success('Marca foi desativada com sucesso!', true);
                        },
                        error => {
                            console.log(error);
                            this.alertaService.error("Erro ao desativar Marca" + error);
                        });
            }
        });
    }
}
