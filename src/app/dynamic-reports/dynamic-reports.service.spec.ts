import { TestBed } from '@angular/core/testing';

import { DynamicReportsService } from './dynamic-reports.service';

describe('DynamicReportsService', () => {
  let service: DynamicReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
