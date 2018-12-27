export class Dominio {
  codigo: number;
  nome: string;
  descricao: string;
  data: string;
  hora: string;


  constructor(codigo: number, nome: string, descricao: string, data: string, hora: string) {
    this.codigo = codigo;
    this.nome = nome;
    this.descricao = descricao;
    this.data = data;
    this.hora = hora;
  }
}
