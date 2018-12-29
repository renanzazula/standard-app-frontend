import {Categoria} from "./categoria";

export class ItensTipoMedida {

    codigo: string;
    valor: string;
    categoria: Categoria;

    constructor(codigo: string, valor: string, categoria: Categoria) {
        this.codigo = codigo;
        this.valor = valor;
        this.categoria = categoria;
    }
}