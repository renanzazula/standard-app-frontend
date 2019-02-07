import {ProdutoHasItensTipoMedida} from "../../model/produtoHasItensTipoMedida";

export interface DialogTableDataInterface {
    cabecalho: string // Exclusao - danger , edicao - alert
    tipo: string;
    mensagem: string;
    codigo: string;
    nome: string;
    produtoHasItensTipoMedida: ProdutoHasItensTipoMedida[];
}
