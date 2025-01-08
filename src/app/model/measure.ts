import { ItemsTypeMeasure } from './ItemsTypeMeasure';
import { Category } from './category';
import { Subcategory } from './subcategory';
import { Brand } from './brand';

export class Measure {
    id: number;
    name: string;
    description: string;
    data: string;
   // hora: string;
   // dataAlteracao: string;
   // horaAlteracao: string;
   // status: string;
    itemsTypeMeasure: ItemsTypeMeasure[];

    category: Category;
    subcategory: Subcategory;
    brand: Brand;

    constructor() {
    }

}
