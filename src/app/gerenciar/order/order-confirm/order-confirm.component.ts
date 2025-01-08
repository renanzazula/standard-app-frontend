import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../service/venda/order.service";
import {Order} from "../../../model/order";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {AlertService} from "../../../service/mensagens/alerta/alert.service";
import {OrderHasItemTypeMeasure} from "../../../model/orderHasItemTypeMeasure";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html'
})
export class OrderConfirmComponent implements OnInit {

  venda: Order = new Order();
  OrderHasItemTypeMeasure: OrderHasItemTypeMeasure[] = [];
  vendaAddProdutosFormGroup: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertaService: AlertService,
    private vendaService: OrderService) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.vendaService.getOrderById(id).subscribe(
      (venda: Order) => {
        this.OrderHasItemTypeMeasure = venda.OrderHasItemTypeMeasure;
        this.venda = venda;
      });
  }

  onConfirmar() {
    this.vendaService.updateStatusOrder(this.venda)
      .pipe(first())
      .subscribe(
        (v: Order) => {
          this.router.navigate(["venda/" + v.id + "/imprimir"]);
        }, error => {
          this.alertaService.error(error);
        });
  }
}
