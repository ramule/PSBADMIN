import { TestBed } from '@angular/core/testing';

import { CorporateMenuService } from './corporate-menu.service';

describe('CorporateMenuService', () => {
  let service: CorporateMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
