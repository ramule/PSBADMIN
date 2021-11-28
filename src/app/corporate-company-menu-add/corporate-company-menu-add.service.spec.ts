import { TestBed } from '@angular/core/testing';

import { CorporateCompanyMenuAddService } from './corporate-company-menu-add.service';

describe('CorporateCompanyMenuAddService', () => {
  let service: CorporateCompanyMenuAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateCompanyMenuAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
