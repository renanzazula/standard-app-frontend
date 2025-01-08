import {Component, OnInit} from '@angular/core';
import {DomainService} from "../../../service/domain/domain.service";
import {Domain} from "../../../model/domain";

@Component({
    selector: 'app-domain-list',
    templateUrl: './domain-list.component.html'
})
export class DomainListComponent implements OnInit {

    page_nome = "Domain";
    nunhum_encontrado = "No " + this.page_nome + " found!";
    domains: Domain[] = [];

    constructor(private dominioService: DomainService) {
    }

    ngOnInit() {
        this.get();
    }

    get() {
        this.dominioService.findAll().subscribe(
            (provider: any[]) => {
                this.domains = provider;
            }, (error) => console.log(error)
        );
    }

}
