import {Component, OnInit} from '@angular/core';
import {Subcategory} from "../../../model/subcategory";
import {SubcategoryService} from "../../../service/subcategory/subcategory.service";

@Component({
    selector: 'app-subcategory-list',
    templateUrl: './subcategory-list.component.html'
})
export class SubcategoryListComponent implements OnInit {
    page_nome = "Subcategory";
    nunhum_encontrado = "No Subcategory found!";
    subcategories: Subcategory[] = [];

    constructor(private subcategoryService: SubcategoryService) {
    }

    ngOnInit() {
        this.get();
    }

    get() {
        this.subcategoryService.findAll().subscribe(
            (subcategory: any[]) => {
                this.subcategories = subcategory;
            }, (error) => console.log(error)
        );
    }

}
