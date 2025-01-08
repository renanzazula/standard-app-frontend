export class PaymentMethod {
  id: number;
  name: string;
  description: string;
  discountPercent: number;
  data: string;
  hora: string;


  constructor(id: number, name: string, description: string, discountPercent: number, data: string, hora: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.discountPercent = discountPercent;
    this.data = data;
    this.hora = hora;
  }


}
