import { ProductHasItemsTypeMeasure } from '../../model/productHasItemsTypeMeasure';

export interface DialogTableDataInterface {
    cabecalho: string // Exclusao - danger , edicao - alert
    tipo: string;
    mensagem: string;
    id: string;
    name: string;
    productHasItemsTypeMeasure: ProductHasItemsTypeMeasure[];
}
