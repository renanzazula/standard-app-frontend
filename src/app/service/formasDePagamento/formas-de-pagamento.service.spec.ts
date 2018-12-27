import { TestBed } from '@angular/core/testing';

import { FormasDePagamentoService } from './formas-de-pagamento.service';

describe('FormasDePagamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormasDePagamentoService = TestBed.get(FormasDePagamentoService);
    expect(service).toBeTruthy();
  });
});
