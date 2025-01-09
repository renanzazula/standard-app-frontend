import { Component, Inject, OnInit } from '@angular/core';

import { DialogDataInterface } from './dialog-data.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit {

    ngOnInit() {
    }

    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogDataInterface) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
