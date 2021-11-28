import { TestBed } from '@angular/core/testing';

import { CorporateCompanyEditService } from './corporate-company-edit.service';

describe('CorporateCompanyEditService', () => {
  let service: CorporateCompanyEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateCompanyEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
