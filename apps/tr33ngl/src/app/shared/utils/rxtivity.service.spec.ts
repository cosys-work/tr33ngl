import { TestBed } from '@angular/core/testing';

import { RxtivityService } from './rxtivity.service';

describe('RxtivityService', () => {
  let service: RxtivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxtivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
