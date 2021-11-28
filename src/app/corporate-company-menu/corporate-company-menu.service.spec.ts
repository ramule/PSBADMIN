import { TestBed } from '@angular/core/testing';

import { CorporateCompanyMenuService } from './corporate-company-menu.service';

describe('CorporateCompanyMenuService', () => {
  let service: CorporateCompanyMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateCompanyMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
