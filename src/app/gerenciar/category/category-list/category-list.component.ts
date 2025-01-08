import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../service/category/category.service";
import {Category} from "../../../model/category";

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {

    categories: Category[] = [];

    constructor(private categoryService: CategoryService) {
    }

    ngOnInit() {
        this.get();
    }

    get() {
        this.categoryService.findAll().subscribe(
            (category: any[]) => {
                this.categories = category;
            }, (error) => console.log(error)
        );

    }

}
