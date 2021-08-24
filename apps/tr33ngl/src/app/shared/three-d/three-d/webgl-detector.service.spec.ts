import { TestBed } from '@angular/core/testing';

import { WebglDetectorService } from './webgl-detector.service';

describe('WebglDetectorService', () => {
  let service: WebglDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebglDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
