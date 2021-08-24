import { TestBed } from '@angular/core/testing';

import { DomHandlersService } from './dom-handlers.service';

describe('DomHandlersService', () => {
  let service: DomHandlersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomHandlersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
