import { TestBed } from '@angular/core/testing';

import { QueryReportService } from './query-report.service';

describe('QueryReportService', () => {
  let service: QueryReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
