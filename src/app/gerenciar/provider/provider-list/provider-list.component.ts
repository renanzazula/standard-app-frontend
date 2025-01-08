import {Component, OnInit} from '@angular/core';
import {Provider} from "../../../model/provider";
import {ProviderService} from "../../../service/provider/provider.service";

@Component({
    selector: 'app-provider-list',
    templateUrl: './provider-list.component.html',
})
export class ProviderListComponent implements OnInit {

    page_nome = "Provider";
    nunhum_encontrado = "No provider found!";
    providers: Provider[] = [];

    constructor(private providerService: ProviderService) {
    }

    ngOnInit() {
        this.get();
    }

    get() {
        this.providerService.findAll().subscribe(
            (provider: any[]) => {
                this.providers = provider;
            }, (error) => console.log(error)
        );
    }

}
