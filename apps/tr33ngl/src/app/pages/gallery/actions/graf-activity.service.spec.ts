import { TestBed } from '@angular/core/testing';

import { GrafActivityService } from './graf-activity.service';

describe('GrafActivityService', () => {
  let service: GrafActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrafActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
