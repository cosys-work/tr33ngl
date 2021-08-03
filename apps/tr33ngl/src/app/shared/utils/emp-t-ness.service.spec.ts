import { TestBed } from '@angular/core/testing';

import { EmpTNessService } from './emp-t-ness.service';

describe('EmpTNessService', () => {
  let service: EmpTNessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpTNessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
