import { Domain } from './domain';
import { ItemsTypeMeasure } from './ItemsTypeMeasure';
import { Product } from './product';

export class ProductHasItemsTypeMeasure {

    id: number;
    domains: Domain[];
    quantity: number;
    unitValue: number;
    itemsTypeMeasure: ItemsTypeMeasure;
    product: Product;

    constructor() {
    }


}
