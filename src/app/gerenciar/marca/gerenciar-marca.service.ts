import {EventEmitter, Injectable, Input, Output} from '@angular/core';
import {Marca} from "../../model/marca";

@Injectable()
export class GerenciarMarcaService {

  marcaOutputEventEmitter = new EventEmitter<Marca>();
  marcaChange = new EventEmitter<void>();

  constructor() { }


}
