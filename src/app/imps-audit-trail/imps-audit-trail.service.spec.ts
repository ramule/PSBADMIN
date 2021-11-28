import { TestBed } from '@angular/core/testing';

import { ImpsAuditTrailService } from './imps-audit-trail.service';

describe('ImpsAuditTrailService', () => {
  let service: ImpsAuditTrailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsAuditTrailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
