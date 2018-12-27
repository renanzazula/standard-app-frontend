import { TestBed } from '@angular/core/testing';

import { RetiradaService } from './retirada.service';

describe('RetiradaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetiradaService = TestBed.get(RetiradaService);
    expect(service).toBeTruthy();
  });
});
