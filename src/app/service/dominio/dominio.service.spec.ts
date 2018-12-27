import { TestBed } from '@angular/core/testing';

import { DominioService } from './dominio.service';

describe('DominioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DominioService = TestBed.get(DominioService);
    expect(service).toBeTruthy();
  });
});
