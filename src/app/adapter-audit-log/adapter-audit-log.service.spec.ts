import { TestBed } from '@angular/core/testing';

import { AdapterAuditLogService } from './adapter-audit-log.service';

describe('AdapterAuditLogService', () => {
  let service: AdapterAuditLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdapterAuditLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
