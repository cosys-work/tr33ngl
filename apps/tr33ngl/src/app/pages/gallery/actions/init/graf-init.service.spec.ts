import { TestBed } from '@angular/core/testing';

import { GrafInitService } from './graf-init.service';

describe('GrafInitService', () => {
  let service: GrafInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrafInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
