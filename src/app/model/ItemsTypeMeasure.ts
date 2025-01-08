import {Category} from "./category";
import {Subcategory} from "./subcategory";
import {Brand} from "./brand";

export class ItemsTypeMeasure {

    id: number;
    amount: string;
    category: Category;
    subcategory: Subcategory;
    brand: Brand;

    constructor(valor: string) {
        this.amount = valor;
    }
}
