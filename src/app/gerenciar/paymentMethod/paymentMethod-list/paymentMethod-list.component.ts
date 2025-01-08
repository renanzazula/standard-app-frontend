import {Component, OnInit} from '@angular/core';
import {PaymentMethodService} from "../../../service/paymentMethod/payment-method.service";
import {PaymentMethod} from "../../../model/paymentMethod";

@Component({
  selector: 'app-paymentMethod-list',
  templateUrl: './paymentMethod-list.component.html',
})
export class PaymentMethodListComponent implements OnInit {

  page_nome = "Payment Method";
  nunhum_encontrado = "No Payment Method found!";
  paymentMethods: PaymentMethod[] = [];

  constructor(private paymentMethodService: PaymentMethodService) {
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.paymentMethodService.findAll().subscribe(
        (formasDePagamento: any[]) => {
          this.paymentMethods = formasDePagamento;
        }, (error) => console.log(error)
    );
  }

}
