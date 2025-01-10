import {Component, OnInit} from '@angular/core';
import {Order} from "../../../model/order";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../service/mensagens/alerta/alert.service";
import {OrderService} from "../../../service/order/order.service";

@Component({
  selector: 'app-order-print',
  templateUrl: './order-print.component.html'
})
export class OrderPrintComponent implements OnInit {

  venda: Order;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertaService: AlertService,
    private vendaService: OrderService) {
  }

  ngOnInit() {
    alert("Aqui")
    const id = this.activatedRoute.snapshot.params['id'];
    this.vendaService.getOrderById(id).subscribe(
      (venda: Order) => {
        this.venda = venda;
      });
  }
}
