import { TestBed } from '@angular/core/testing';

import { CorporateCompanyUserRequestsEditService } from './corporate-company-user-requests-edit.service';

describe('CorporateCompanyUserRequestsEditService', () => {
  let service: CorporateCompanyUserRequestsEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateCompanyUserRequestsEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
