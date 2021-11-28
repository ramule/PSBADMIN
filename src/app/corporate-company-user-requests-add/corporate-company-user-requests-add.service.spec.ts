import { TestBed } from '@angular/core/testing';

import { CorporateCompanyUserRequestsAddService } from './corporate-company-user-requests-add.service';

describe('CorporateCompanyUserRequestsAddService', () => {
  let service: CorporateCompanyUserRequestsAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateCompanyUserRequestsAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
