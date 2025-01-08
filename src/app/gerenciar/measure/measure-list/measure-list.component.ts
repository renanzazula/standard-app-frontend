import {Component, OnInit} from '@angular/core';
import {MeasureService} from "../../../service/measure/measure.service";
import {Measure} from "../../../model/measure";

@Component({
    selector: 'app-measure-list',
    templateUrl: './measure-list.component.html'
})
export class MeasureListComponent implements OnInit {

    measures: Measure[] = [];

    constructor(private measureService: MeasureService) {
    }

    ngOnInit() {
        this.get();
    }

    get() {
        this.measureService.findAll().subscribe(
            (measure: any[]) => {
                this.measures = measure;
            }, (error) => console.log(error)
        );

    }

}
