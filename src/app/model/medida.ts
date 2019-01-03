import {ItensTipoMedida} from "./ItensTipoMedida";
import {Categoria} from "./categoria";
import {Subcategoria} from "./subcategoria";
import {Marca} from "./marca";

export class Medida {
    codigo: number;
    nome: string;
    descricao: string;
    data: string;
   // hora: string;
   // dataAlteracao: string;
   // horaAlteracao: string;
   // status: string;
    itensTipoMedida: ItensTipoMedida[];

    categoria: Categoria;
    subcategoria: Subcategoria;
    marca: Marca;

    constructor() {
    }

}
