export class Marca {
    codigo: number;
    nome: string;
    descricao: string;
    data: string;
    hora: string;
    dataAlteracao: string;
    horaAlteracao: string;
    status: string;


    constructor(codigo: number, nome: string,
                descricao: string, data: string,
                hora: string, dataAlteracao: string,
                horaAlteracao: string, status: string) {
        this.codigo = codigo;
        this.nome = nome;
        this.descricao = descricao;
        this.data = data;
        this.hora = hora;
        this.dataAlteracao = dataAlteracao;
        this.horaAlteracao = horaAlteracao;
        this.status = status;
    }

}
