import { TestBed } from '@angular/core/testing';

import { ImageUtilsService } from './image-utils.service';

describe('ImageUtilsService', () => {
  let service: ImageUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
