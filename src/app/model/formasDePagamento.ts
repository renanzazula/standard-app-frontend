export class FormasDePagamento {
  codigo: number;
  nome: string;
  descricao: string;
  porcentagemDesconto: number;
  data: string;
  hora: string;


  constructor(codigo: number, nome: string, descricao: string, porcentagemDesconto: number, data: string, hora: string) {
    this.codigo = codigo;
    this.nome = nome;
    this.descricao = descricao;
    this.porcentagemDesconto = porcentagemDesconto;
    this.data = data;
    this.hora = hora;
  }


}
