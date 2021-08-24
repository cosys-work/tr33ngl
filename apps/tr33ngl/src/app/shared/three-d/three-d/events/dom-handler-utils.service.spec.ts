import { TestBed } from '@angular/core/testing';

import { DomHandlerUtilsService } from './dom-handler-utils.service';

describe('DomHandlerUtilsService', () => {
  let service: DomHandlerUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomHandlerUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
