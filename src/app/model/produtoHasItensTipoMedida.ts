import {Dominio} from "./dominio";
import {ItensTipoMedida} from "./ItensTipoMedida";
import {Produto} from "./produto";

export class ProdutoHasItensTipoMedida {

    codigo: number;
    dominios: Dominio[];
    quantidade: number;
    valorUnitario: number;
    itensTipoMedida: ItensTipoMedida;
    produto: Produto;

    constructor() {
    }


}