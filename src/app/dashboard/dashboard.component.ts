import {Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    gal_n_elem: number = 0;
    gal_page: number = 1;

    constructor() {
    }

    ngOnInit() {
        this.gal_n_elem = $('#gallery .wrapper li').length;
        $('#gallery .wrapper').width(this.gal_n_elem * 100 + '%');
        $('#gallery .wrapper li').width(100 / this.gal_n_elem + '%');
    }

    galeriaAnterior() {
        if (this.gal_page < 2) return;
        this.galeriaCargarPagina(this.gal_page - 1);
    }

    galeriaSiguiente() {
        if (this.gal_page > this.gal_n_elem - 1) return;
        this.galeriaCargarPagina(this.gal_page + 1);
    }

    galeriaCargarPagina(n) {
        const gal_page = n;
        if (n > 1) {
            $('#gallery .anterior').removeClass('disabled');
        } else {
            $('#gallery .anterior').addClass('disabled');
        }
        if (n < this.gal_n_elem) {
            $('#gallery .siguiente').removeClass('disabled');
        } else {
            $('#gallery .siguiente').addClass('disabled');
        }
        $('#gallery .wrapper').animate({"margin-left": -100 * (n - 1) + '%'}, 500);
    }


}
