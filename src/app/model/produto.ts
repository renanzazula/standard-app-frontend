import {Subcategoria} from "./subcategoria";
import {Marca} from "./marca";
import {Categoria} from "./categoria";
import {Medida} from "./medida";
import {Fornecedor} from "./fornecedor";
import {Dominio} from "./dominio";

export class Produto {

    codigo: number;
    barCode: string;
    nome: string;
    status: string;
    descricao: string;
    preco: number;
    precoVenda: number;
    precoCusto: number;
    precoOferta: number;
    desconto: number;
    peso: number;
    porcentagem: number;
    porcentagemDesconto: number;
    dataCadastro: string;
    horaCadastro: string;
    fornecedor: Fornecedor;
    medida: Medida;
    categoria: Categoria;
    subCategoria: Subcategoria;
    marca: Marca;
    dominios: Dominio[];
    fornecedores: Fornecedor[];
    categorias: Categoria[];
    subcategorias: Subcategoria[];
    marcas: Marca[];
    medidas: Medida[];

    constructor() {
    }
}
