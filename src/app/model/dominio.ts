export class Dominio {
  codigo: number;
  nome: string;
  descricao: string;
  checked: boolean;

  constructor(codigo: number, nome: string, descricao: string) {
    this.codigo = codigo;
    this.nome = nome;
    this.descricao = descricao;

  }
}
