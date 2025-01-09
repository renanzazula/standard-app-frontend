import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogTableDataInterface } from './dialog.table-data.interface';
import { ProductHasItemsTypeMeasure } from '../../model/productHasItemsTypeMeasure';

@Component({
    selector: 'app-dialog.table',
    templateUrl: './dialog.table.component.html'
})
export class DialogTableComponent implements OnInit {

    ngOnInit() {
    }

    constructor(
        public dialogRef: MatDialogRef<DialogTableComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogTableDataInterface) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSelect(productHasItemsTypeMeasure : ProductHasItemsTypeMeasure){
      console.log("onSelect");
      console.log(productHasItemsTypeMeasure);
      this.dialogRef.close(productHasItemsTypeMeasure);
    }
}
