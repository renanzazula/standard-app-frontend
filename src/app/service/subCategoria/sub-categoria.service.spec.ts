import { TestBed } from '@angular/core/testing';

import { SubCategoriaService } from './sub-categoria.service';

describe('SubCategoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubCategoriaService = TestBed.get(SubCategoriaService);
    expect(service).toBeTruthy();
  });
});
