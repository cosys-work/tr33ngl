import { TestBed } from '@angular/core/testing';

import { AxisEngineService } from './axis-engine.service';

describe('AxisEngineService', () => {
  let service: AxisEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AxisEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
