import { TestBed } from '@angular/core/testing';

import { SidebarTogglrService } from './sidebar-togglr.service';

describe('SidebarTogglrService', () => {
  let service: SidebarTogglrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarTogglrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
