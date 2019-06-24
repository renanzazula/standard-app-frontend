import {Component, OnInit} from '@angular/core';
import {VendaService} from "../../../service/venda/venda.service";
import {Venda} from "../../../model/venda";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-venda-confirmar',
  templateUrl: './venda-confirmar.component.html'
})
export class VendaConfirmarComponent implements OnInit {

  venda: Venda;

  constructor(
    private activatedRoute: ActivatedRoute,
    private vendaService: VendaService) {
  }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params['codigo'];
    this.vendaService.getVendaById(codigo).subscribe(
       (venda: Venda) => {
         console.log(venda);
         this.venda = venda;
    });
  }
}
