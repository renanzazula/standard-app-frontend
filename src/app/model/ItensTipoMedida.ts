import {Categoria} from "./categoria";

export class ItensTipoMedida {

    codigo: string;
    valor: string;
    categoria: Categoria;


    constructor(valor: string) {
        this.valor = valor;
    }
}