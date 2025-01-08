import { Subcategory } from './subcategory';
import { Brand } from './brand';
import { Category } from './category';
import { Measure } from './measure';
import { Provider } from './provider';
import { ProductHasItemsTypeMeasure } from './productHasItemsTypeMeasure';

export class Product {

    id: number;
    barCode: string;
    name: string;
    description: string;

    costPrice: number;
    percent: number;
    price: number;

    discountPercent: number;
    discount: number;
    salePrice: number;
    peso: number;
    totalStockQuantity: number

    provider: Provider;
    measure: Measure;
    category: Category;
    subcategory: Subcategory;
    brand: Brand;

    productHasItemsTypeMeasure: ProductHasItemsTypeMeasure[];

    constructor() {
    }
}
