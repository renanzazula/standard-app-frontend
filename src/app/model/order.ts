import { OrderHasItemTypeMeasure } from './orderHasItemTypeMeasure';
import { PaymentMethod } from './paymentMethod';

export class Order {

  id: number;
  data: string;
  hora: string;
  totalAmount: number;
  quantity: number;
  subTotal: number;
  pendingAmount: number;
  paidAmount: number;
  discount: number;
  totalAmountToPaid: number;
  change: number;
  payment: number;
  status: string;
  paymentMethod: PaymentMethod;
  subtotal: number;
  OrderHasItemTypeMeasure: OrderHasItemTypeMeasure[] = [];
  totalPaid: number;

  // TODO:
  // caixa: Caixa
  // cliente: Cliente
  constructor() {
  }
}
