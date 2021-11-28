import { TestBed } from '@angular/core/testing';

import { CorporateUserBulkregistrationService } from './corporate-user-bulkregistration.service';

describe('CorporateUserBulkregistrationService', () => {
  let service: CorporateUserBulkregistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateUserBulkregistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
