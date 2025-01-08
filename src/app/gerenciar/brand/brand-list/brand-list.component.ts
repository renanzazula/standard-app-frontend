import {Component, EventEmitter, OnInit} from '@angular/core';
import {Brand} from "../../../model/brand";
import {BrandService} from "../../../service/brand/brand.service";

import {Router} from "@angular/router";


@Component({
    selector: 'app-brand-list',
    templateUrl: './brand-list.component.html'
})
export class BrandListComponent implements OnInit {

    brandChange = new EventEmitter<void>();
    brands: Brand[] = [];

    constructor(
        private router: Router,
        private marcaService: BrandService) {
    }

    ngOnInit() {
        this.brandChange.subscribe(
            () => {
                this.get();
            }
        );
        this.get();
    }

    get(){
        this.marcaService.findAll().subscribe(
            (brand: any[]) => {
                this.brands = brand;
            }, (error) => console.log(error)
        );
    }




}
