import { TestBed } from '@angular/core/testing';

import { CorporateCompanyMenuEditService } from './corporate-company-menu-edit.service';

describe('CorporateCompanyMenuEditService', () => {
  let service: CorporateCompanyMenuEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateCompanyMenuEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
