import { TestBed } from '@angular/core/testing';

import { CorporateApproverRequestsService } from './corporate-approver-requests.service';

describe('CorporateApproverRequestsService', () => {
  let service: CorporateApproverRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateApproverRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
