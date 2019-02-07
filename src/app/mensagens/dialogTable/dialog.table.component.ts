import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogTableDataInterface} from "./dialog.table-data.interface";
import {ProdutoHasItensTipoMedida} from "../../model/produtoHasItensTipoMedida";

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

    onSelect(produtoHasItensTipoMedida : ProdutoHasItensTipoMedida){
      console.log("onSelect");
      console.log(produtoHasItensTipoMedida);
      this.dialogRef.close(produtoHasItensTipoMedida);
    }
}
