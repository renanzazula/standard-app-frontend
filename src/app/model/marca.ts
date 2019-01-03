export class Marca {
    codigo: number;
    nome: string;
    descricao: string;
    status: string;


    constructor(codigo: number, nome: string,
                descricao: string, status: string) {
        this.codigo = codigo;
        this.nome = nome;
        this.descricao = descricao;
        this.status = status;
    }

}
