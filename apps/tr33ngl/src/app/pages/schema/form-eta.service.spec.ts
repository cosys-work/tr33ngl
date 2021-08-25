import { TestBed } from '@angular/core/testing';

import { FormEtaService } from './form-eta.service';

describe('FormEtaService', () => {
  let service: FormEtaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormEtaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
