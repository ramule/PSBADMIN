import { TestBed } from '@angular/core/testing';

import { CorporateCompanyUserRequestsService } from './corporate-company-user-requests.service';

describe('CorporateCompanyUserRequestsService', () => {
  let service: CorporateCompanyUserRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateCompanyUserRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
