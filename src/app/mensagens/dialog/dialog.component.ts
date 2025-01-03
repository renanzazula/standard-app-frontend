import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogDataInterface } from './dialog-data.interface';

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
