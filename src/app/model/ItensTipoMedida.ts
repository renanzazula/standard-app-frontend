import {Categoria} from "./categoria";
import {Subcategoria} from "./subcategoria";
import {Marca} from "./marca";

export class ItensTipoMedida {

    codigo: string;
    valor: string;
    categoria: Categoria;
    subcategoria: Subcategoria;
    marca: Marca;

    constructor(valor: string) {
        this.valor = valor;
    }
}
