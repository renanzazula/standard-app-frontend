import {Component, OnInit} from '@angular/core';
import {Venda} from "../../../model/venda";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertaService} from "../../../service/mensagens/alerta/alerta.service";
import {VendaService} from "../../../service/venda/venda.service";

@Component({
  selector: 'app-venda-imprimir',
  templateUrl: './venda-imprimir.component.html'
})
export class VendaImprimirComponent implements OnInit {

  venda: Venda;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertaService: AlertaService,
    private vendaService: VendaService) {
  }

  ngOnInit() {
    alert("Aqui")
    const codigo = this.activatedRoute.snapshot.params['codigo'];
    this.vendaService.getVendaById(codigo).subscribe(
      (venda: Venda) => {
        this.venda = venda;
      });
  }
}
