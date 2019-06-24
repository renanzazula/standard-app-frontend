import {Component, OnInit} from '@angular/core';
import {VendaService} from "../../../service/venda/venda.service";
import {Venda} from "../../../model/venda";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {AlertaService} from "../../../service/mensagens/alerta/alerta.service";
import {VendaHasItemProduto} from "../../../model/vendaHasItemProduto";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-venda-confirmar',
  templateUrl: './venda-confirmar.component.html'
})
export class VendaConfirmarComponent implements OnInit {

  venda: Venda = new Venda();
  vendaHasItemProduto: VendaHasItemProduto[] = [];
  vendaAddProdutosFormGroup: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertaService: AlertaService,
    private vendaService: VendaService) {
  }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params['codigo'];
    this.vendaService.getVendaById(codigo).subscribe(
      (venda: Venda) => {
        this.vendaHasItemProduto = venda.vendaHasItemProduto;
        this.venda = venda;
      });
  }

  onConfirmar() {
    this.vendaService.confirmar(this.venda)
      .pipe(first())
      .subscribe(
        (v: Venda) => {
          this.router.navigate(["venda/" + v.codigo + "/imprimir"]);
        }, error => {
          this.alertaService.error(error);
        });
  }
}
