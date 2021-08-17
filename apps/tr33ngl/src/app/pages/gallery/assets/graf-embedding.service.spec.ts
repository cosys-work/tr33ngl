import { TestBed } from '@angular/core/testing';

import { GrafEmbeddingService } from './graf-embedding.service';

describe('GrafEmbeddingService', () => {
  let service: GrafEmbeddingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrafEmbeddingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
