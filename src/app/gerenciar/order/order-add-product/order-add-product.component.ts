import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../service/mensagens/alerta/alert.service';
import {MatDialog} from '@angular/material/dialog';
import {PaymentMethod} from '../../../model/paymentMethod';
import {PaymentMethodService} from '../../../service/paymentMethod/payment-method.service';
import {OrderHasItemTypeMeasure} from '../../../model/orderHasItemTypeMeasure';
import {ProductService} from '../../../service/product/product.service';
import {ProductHasItemsTypeMeasure} from '../../../model/productHasItemsTypeMeasure';
import {Product} from '../../../model/product';
import {DialogTableComponent} from '../../../mensagens/dialogTable/dialog.table.component';
import {OrderService} from '../../../service/venda/order.service';
import {first} from 'rxjs/operators';
import {Order} from '../../../model/order';

@Component({
  selector: 'app-order-add-product',
  templateUrl: './order-add-product.component.html'
})
export class OrderAddProductComponent implements OnInit {

  nome_page: string = 'Venda';


  mensagem_excluir = "Do you really want to delete?";
  cabecalho_excluir = "Delete?";
  tipo_excluir = "danger";
  message_desativado_sucesso = this.nome_page + ' was successfully deactivated!';

  cabecalho_alterar = "Edit?";
  mensagem_alterar = "Do you really want to edit?";
  tipo_alterar = "warning";
  message_alterado_sucesso = 'Updated successfully!';

  message_registrado_sucesso = 'Registered successfully!';
  messagem_erro = "Error deactivating " + this.nome_page + " ";
  nunhum_encontrado = "No product  found!";
  temProduto = false;
  submitted = false;
  vendaAddProdutosFormGroup: FormGroup;
  formasDePagamentos: PaymentMethod[];
  OrderHasItemTypeMeasure: OrderHasItemTypeMeasure[] = [];
  barcode: string;
  totalItens: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertaService: AlertService,
    private dialogComponente: MatDialog,
    private formasdepagamentoService: PaymentMethodService,
    private produtoService: ProductService,
    private vendaService: OrderService
  ) {
    this.vendaAddProdutosFormGroup = this.formBuilder.group({
      id: [''],
      barcode: [''],
      formasDePagamento: ['', Validators.required],
      subtotal: [''],
      discount: [''],
      totalPaid: [''],
      payment: [''],
      change: [''],
      paidAmount: [''],
      pendingAmount: ['']
    });
  }

  ngOnInit() {
    this.formasdepagamentoService.findAll().subscribe(
      (formasDePagamento: any[]) => {
        this.formasDePagamentos = formasDePagamento;
      }, (error) => console.log(error)
    );
  }

  addProduto() {
    this.produtoService.getByBarcode(this.vendaAddProdutosFormGroup.controls.barcode.value).subscribe((p: Product) => {
      const dialogRef = this.dialogComponente.open(DialogTableComponent, {
        data: {
          cabecalho: "Measure",
          id: "",
          name: "",
          mensagem: "",
          tipo: "warning",
          productHasItemsTypeMeasure: p.productHasItemsTypeMeasure
        }
      });
      dialogRef.afterClosed().subscribe((result: ProductHasItemsTypeMeasure) => {
        if (result != null) {
          let v = new OrderHasItemTypeMeasure();
          v.quantity = 1;
          v.unitValue = p.price;
          v.productHasItemsTypeMeasure = result;
          this.totalItens = this.totalItens + p.price;
          this.OrderHasItemTypeMeasure.push(v);
        }
      });
      this.vendaAddProdutosFormGroup.controls.barcode.setValue("");
      this.onChangeFormapagamento(this.vendaAddProdutosFormGroup.controls.formasDePagamento.value);
      this.calculaTroco();

    });
  }

  stringify(o: any): string {
    return JSON.stringify(o);
  }

  remover(index) {
    let v: OrderHasItemTypeMeasure = this.OrderHasItemTypeMeasure[index];
    this.totalItens = this.totalItens - (v.unitValue * v.quantity);
    this.OrderHasItemTypeMeasure.splice(index, 1);
    this.onChangeFormapagamento(this.vendaAddProdutosFormGroup.controls.formasDePagamento.value);
    this.calculaTroco();
  }

  onChangeFormapagamento(value) {
    console.log("value:" + value);
    if (this.OrderHasItemTypeMeasure.length === 0) {
      this.vendaAddProdutosFormGroup.controls.totalPaid.setValue(0);
      this.vendaAddProdutosFormGroup.controls.subtotal.setValue(0);
      this.vendaAddProdutosFormGroup.controls.discount.setValue(0);
      this.vendaAddProdutosFormGroup.controls.payment.setValue(0);
    } else if (!!value && value !== undefined && value !== null) {
      var formadePagamento: PaymentMethod = JSON.parse(value);
      var totalpagar = this.totalItens - ((formadePagamento.discountPercent / 100) * this.totalItens);
      this.vendaAddProdutosFormGroup.controls.totalPaid.setValue(totalpagar);
      this.vendaAddProdutosFormGroup.controls.subtotal.setValue(totalpagar);
      this.vendaAddProdutosFormGroup.controls.discount.setValue(formadePagamento.discountPercent);
      this.vendaAddProdutosFormGroup.controls.payment.setValue(totalpagar);
      this.vendaAddProdutosFormGroup.controls.paidAmount.setValue(totalpagar);
    }
  }

  calculaTroco() {
    var totalpagar = this.vendaAddProdutosFormGroup.controls.totalPaid.value;
    var payment = this.vendaAddProdutosFormGroup.controls.payment.value;
    var paidAmount = 0;
    if (payment >= totalpagar) {
      paidAmount = payment - totalpagar;
      this.vendaAddProdutosFormGroup.controls.change.setValue(paidAmount);
      this.vendaAddProdutosFormGroup.controls.pendingAmount.setValue(0);
    } else {
      paidAmount = totalpagar - payment;
      this.vendaAddProdutosFormGroup.controls.change.setValue(0);
      this.vendaAddProdutosFormGroup.controls.pendingAmount.setValue(paidAmount);
    }
    this.vendaAddProdutosFormGroup.controls.paidAmount.setValue(payment);
  }

  onAvancar() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.vendaAddProdutosFormGroup.invalid) {
      return;
    }

    var order: Order = new Order();
    order.paymentMethod = JSON.parse(this.vendaAddProdutosFormGroup.controls.formasDePagamento.value);
    order.subtotal = this.vendaAddProdutosFormGroup.controls.subtotal.value;
    order.discount = this.vendaAddProdutosFormGroup.controls.discount.value;
    order.totalPaid = this.vendaAddProdutosFormGroup.controls.totalPaid.value;
    order.payment = this.vendaAddProdutosFormGroup.controls.payment.value;
    order.change = this.vendaAddProdutosFormGroup.controls.change.value;
    order.paidAmount = this.vendaAddProdutosFormGroup.controls.paidAmount.value;
    order.pendingAmount = this.vendaAddProdutosFormGroup.controls.pendingAmount.value;
    order.OrderHasItemTypeMeasure = this.OrderHasItemTypeMeasure;

    console.log(order);

    this.vendaService.create(order)
      .pipe(first())
      .subscribe(
        (v: Order) => {
          alert(v);
          order = v;
          this.router.navigate(["venda/" + v.id + "/confirmar"]);
        }, error => {
          this.alertaService.error(error);
        });
  }

  get f() {
    return this.vendaAddProdutosFormGroup.controls;
  }

  onChangeUpdateQuantidadeItemVenda(value, index) {
    let v: OrderHasItemTypeMeasure = this.OrderHasItemTypeMeasure[index];
    v.quantity = value;
    this.totalItens = this.totalItens - (v.unitValue * v.quantity);
    this.onChangeFormapagamento(this.vendaAddProdutosFormGroup.controls.formasDePagamento.value);
    this.calculaTroco();
  }
  onCancel() {}
}
