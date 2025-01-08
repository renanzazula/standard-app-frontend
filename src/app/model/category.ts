import { Subcategory } from './subcategory';

export class Category {

    id: number;
    name: string;
    description: string;
    subcategories: Subcategory[];
}
