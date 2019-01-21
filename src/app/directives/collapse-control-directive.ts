import { NgControl } from '@angular/forms';
import {Directive, Input} from "@angular/core";

@Directive({selector: '[collapseControl]'})
export class CollapseControlDirective {

    @Input() set collapseControl( condition : boolean ) {
        const action = condition ? 'true' : 'false';
        this.ngControl.control[action]();
    }

    constructor(private ngControl : NgControl ) {
    }

}
