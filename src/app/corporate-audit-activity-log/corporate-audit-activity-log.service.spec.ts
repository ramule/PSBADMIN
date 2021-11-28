import { TestBed } from '@angular/core/testing';

import { CorporateAuditActivityLogService } from './corporate-audit-activity-log.service';

describe('CorporateAuditActivityLogService', () => {
  let service: CorporateAuditActivityLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateAuditActivityLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
