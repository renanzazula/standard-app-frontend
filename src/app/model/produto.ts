import {Subcategoria} from "./subcategoria";
import {Marca} from "./marca";
import {Categoria} from "./categoria";
import {Medida} from "./medida";
import {Fornecedor} from "./fornecedor";
import {ProdutoHasItensTipoMedida} from "./produtoHasItensTipoMedida";

export class Produto {

    codigo: number;
    barCode: string;
    nome: string;
    descricao: string;

    precoCusto: number;
    porcentagem: number;
    precoVenda: number;

    porcentagemDesconto: number;
    desconto: number;
    precoOferta: number;
    peso: number;
    preco: number; // todo: validar se necessario

    fornecedor: Fornecedor;
    medida: Medida;
    categoria: Categoria;
    subcategoria: Subcategoria;
    marca: Marca;

    dataCadastro: string;
    horaCadastro: string;
    status: string;
    imagem: Blob;

    produtoHasItensTipoMedida: ProdutoHasItensTipoMedida[];

    // dominios: Dominio[];
    // fornecedores: Fornecedor[];
    // categorias: Categoria[];
    // subcategorias: Subcategoria[];
    // marcas: Marca[];
    // medidas: Medida[];

    constructor() {
    }
}
