import { TestBed } from '@angular/core/testing';

import { BatchReportService } from './batch-report.service';

describe('BatchReportService', () => {
  let service: BatchReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
