import {Component, OnInit} from '@angular/core';
import {Product} from "../../../model/product";
import {ProductService} from "../../../service/product/product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  page_nome = "Product";
  nunhum_encontrado = "No " + this.page_nome + "  found!";
  products: Product[] = [];

  isCollapsed = false;
  expandedIndex: number;

  constructor(private productService: ProductService) {

    this.expandedIndex = -1;

  }

  ngOnInit() {


    this.get();
  }

  onCollaps(index: number, event) {
    if(event.target.textContent==="-"){
        event.target.textContent="+";
    }else{
        event.target.textContent="-";
    }
    this.expandedIndex = index === this.expandedIndex ? -1 : index;
  }


get() {
    this.productService.findAll().subscribe(
        (product: Product[]) => {
          this.products = product;
        }, (error) => console.log(error)
    );
  }

}
