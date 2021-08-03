import { TestBed } from '@angular/core/testing';

import { TypeGuardsService } from './type-guards.service';

describe('TypeGuardsService', () => {
  let service: TypeGuardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeGuardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
