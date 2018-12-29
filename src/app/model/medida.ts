import {ItensTipoMedida} from "./ItensTipoMedida";

export class Medida {
    codigo: number;
    nome: string;
    descricao: string;
    data: string;
    hora: string;
    dataAlteracao: string;
    horaAlteracao: string;
    status: string;
    itensTipoMedida: ItensTipoMedida[];


    constructor(codigo: number, nome: string,
                descricao: string, data: string,
                hora: string, dataAlteracao: string,
                horaAlteracao: string, status: string, itensTipoMedida: ItensTipoMedida[]) {
        this.codigo = codigo;
        this.nome = nome;
        this.descricao = descricao;
        this.data = data;
        this.hora = hora;
        this.dataAlteracao = dataAlteracao;
        this.horaAlteracao = horaAlteracao;
        this.status = status;
        this.itensTipoMedida = itensTipoMedida;
    }

}
