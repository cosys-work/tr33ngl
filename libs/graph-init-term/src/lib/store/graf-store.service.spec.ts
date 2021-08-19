import { TestBed } from '@angular/core/testing';

import { GrafStoreService } from './graf-store.service';

describe('GrafStoreService', () => {
  let service: GrafStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrafStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
