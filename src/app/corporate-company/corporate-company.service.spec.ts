import { TestBed } from '@angular/core/testing';

import { CorporateCompanyService } from './corporate-company.service';

describe('CorporateCompanyService', () => {
  let service: CorporateCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
