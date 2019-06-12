import {VendaHasItemProduto} from "./vendaHasItemProduto";
import {FormasDePagamento} from "./formasDePagamento";

export class Venda {

  codigo: number;
  data: string;
  hora: string;
  valorTotal: number;
  quantidade: number;
  subTotal: number;
  valorPendente: number;
  valorPago: number;
  desconto: number;
  totalApagar: number;
  troco: number;
  pagamento: number;
  status: string;
  formaDePagamento: FormasDePagamento;
  subtotal: number;
  vendaHasItemProduto: VendaHasItemProduto[] = [];
  totalPagar: number;


  // TODO:
  // caixa: Caixa
  // cliente: Cliente
  constructor() {
  }
}
