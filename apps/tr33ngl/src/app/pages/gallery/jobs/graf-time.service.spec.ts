import { TestBed } from '@angular/core/testing';

import { GrafTimeService } from './graf-time.service';

describe('GrafTimeService', () => {
  let service: GrafTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrafTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
