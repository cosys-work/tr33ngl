import { TestBed } from '@angular/core/testing';

import { PagesManifestService } from './pages-manifest.service';

describe('PagesManifestService', () => {
  let service: PagesManifestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagesManifestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
